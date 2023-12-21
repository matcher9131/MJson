import { SchemaDiscriminatedUnionObject, type MetadataDescription, type Schema } from "./types";

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

const createComment = ({ description, remarks }: MetadataDescription): string => {
    let body = (typeof description === "string" ? [description] : description)
        .map((line) => "* " + line)
        .join("\n* \n");
    if (remarks != null) {
        body += "\n* \n* @remarks\n";
        body += (typeof remarks === "string" ? [remarks] : remarks).map((line) => "* " + line).join("\n* \n");
    }
    return `/**\n${body}\n*/`;
};

// type Foo = ... や propertyName: ... の ... に相当する部分を作る（末尾セミコロン無し）
const createTypeLiteral = (schema: Schema): string => {
    if (schema.metadata != null && "typescriptOverride" in schema.metadata) {
        // metadataがMetadataOverrideならそちらを優先する
        return (
            "union" in schema.metadata.typescriptOverride
                ? schema.metadata.typescriptOverride.union
                : [schema.metadata.typescriptOverride]
        )
            .map((childSchema) => createTypeLiteral(childSchema))
            .join(" | ");
    } else if ("type" in schema) {
        // SchemaPrimitive
        return schema.type === "int32" ? "number" : "string";
    } else if ("ref" in schema) {
        // SchemaRef
        return capitalize(schema.ref);
    } else if ("enum" in schema) {
        // SchemaLiteralUnion
        return schema.enum.map((item) => `"${item}"`).join(" | ");
    } else if ("elements" in schema) {
        // SchemaArray
        // 余計な括弧はフォーマッターで消えるので問題なし
        return `readonly (${createTypeLiteral(schema.elements)})[]`;
    } else if ("properties" in schema) {
        // SchemaObject | SchemaObjectWithTypeName
        const propertySignatures = Object.entries(schema.properties).map(([key, childSchema]) => {
            const comment =
                childSchema.metadata != null && "description" in childSchema.metadata
                    ? createComment(childSchema.metadata)
                    : null;
            const body = `readonly ${key}: ${createTypeLiteral(childSchema)};`;
            return comment != null ? `${comment}\n${body}` : body;
        });
        const optionalPropertySignatures = Object.entries(schema.optionalProperties ?? []).map(([key, childSchema]) => {
            const comment =
                childSchema.metadata != null && "description" in childSchema.metadata
                    ? createComment(childSchema.metadata)
                    : null;
            const body = `readonly ${key}?: ${createTypeLiteral(childSchema)};`;
            return comment != null ? `${comment}\n${body}` : body;
        });
        return `{\n${[...propertySignatures, ...optionalPropertySignatures].join("\n\n")}\n}`;
    } else {
        // schemaはSchemaDiscriminatedUnionObject以外であるべき
        throw new Error("Invalid schema");
    }
};

// type Foo = ... を作る（末尾セミコロンあり、TSDocあり）
const createTypeAliasDeclaration = (identifier: string, schema: Schema): string => {
    const comment = schema.metadata != null && "description" in schema.metadata ? createComment(schema.metadata) : null;
    const body = `export ${capitalize(identifier)} = ${createTypeLiteral(schema)};`;
    return comment != null ? `${comment}\n${body}` : body;
};

const createDiscriminatedUnionObjectTypeAliasDeclarations = (
    identifier: string,
    schema: SchemaDiscriminatedUnionObject,
): string => {
    const comment = schema.metadata != null ? createComment(schema.metadata) : null;
    const typeAliasDeclarations = Object.entries(schema.mapping).map(([discriminatorValue, childSchema]) => {
        const comment = childSchema.metadata != null ? createComment(childSchema.metadata) : null;
        const typeName =
            childSchema.metadata != null
                ? childSchema.metadata.typeName
                : `${capitalize(identifier)}${capitalize(discriminatorValue)}`;
        const typeLiteral = createTypeLiteral({
            ...childSchema,
            properties: {
                ...childSchema.properties,
                [schema.discriminator]: {
                    metadata: schema.metadata?.discriminatorDescription,
                    enum: [discriminatorValue],
                },
            },
        });
        const body = `export ${typeName} = ${typeLiteral};`;
        return {
            typeName,
            declaration: comment != null ? `${comment}\n${body}` : body,
        };
    });
    const typeNames = typeAliasDeclarations.map(({ typeName }) => typeName);
    const parentTypeAliasDeclaration = `export ${capitalize(identifier)} = ${typeNames.join(" | ")};`;
    return (
        (comment != null ? `${comment}\n${parentTypeAliasDeclaration}` : parentTypeAliasDeclaration) +
        "\n\n" +
        typeAliasDeclarations.map(({ declaration }) => declaration).join("\n\n")
    );
};
