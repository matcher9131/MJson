import {
    type SchemaDiscriminatedUnionObject,
    type MetadataDescription,
    type Schema,
    type TypescriptOverride,
    type SchemaRoot,
} from "./types";
import * as yaml from "js-yaml";
import * as fs from "fs";

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

const createComment = ({ description, remarks }: MetadataDescription, needsInterfaceAnnotation: boolean): string => {
    let body = (typeof description === "string" ? [description] : description)
        .map((line) => "* " + line)
        .join("\n* \n");
    if (remarks != null) {
        body += "\n* \n* @remarks\n";
        body += (typeof remarks === "string" ? [remarks] : remarks).map((line) => "* " + line).join("\n* \n");
    }
    if (needsInterfaceAnnotation) {
        body += "\n* \n* @interface";
    }
    return `/**\n${body}\n*/`;
};

type OutputWithImports = {
    readonly content: string;
    readonly importTypes: readonly string[];
};

// propertyName: ... ; の配列を作る（TSDocあり）
const createPropertySignatures = (
    properties: Record<string, Schema>,
    overrideDictionary: Record<string, TypescriptOverride>,
    isOptional: boolean,
): OutputWithImports[] => {
    return Object.entries(properties).map(([key, childSchema]) => {
        const comment =
            childSchema.metadata != null && "description" in childSchema.metadata
                ? createComment(childSchema.metadata, false)
                : null;
        const { content, importTypes } = createTypeLiteral(childSchema, overrideDictionary);
        const body = `readonly ${key}${isOptional ? "?" : ""}: ${content};`;
        return { content: comment != null ? `${comment}\n${body}` : body, importTypes };
    });
};

// type Foo = ... や propertyName: ... の ... に相当する部分を作る（末尾セミコロン無し）
const createTypeLiteral = (
    schema: Schema,
    overrideDictionary: Record<string, TypescriptOverride>,
): OutputWithImports => {
    if (schema.metadata != null && "typescriptOverride" in schema.metadata) {
        // metadataがMetadataOverrideならそちらを優先する
        const overrideSchema = overrideDictionary[schema.metadata.typescriptOverride];
        if (overrideSchema == null) throw new Error("Override schema is not found.");
        const typeLiterals = ("union" in overrideSchema ? overrideSchema.union : [overrideSchema]).map((childSchema) =>
            createTypeLiteral(childSchema, overrideDictionary),
        );
        return {
            content: typeLiterals.map(({ content }) => content).join(" | "),
            importTypes: typeLiterals.flatMap(({ importTypes }) => importTypes),
        };
    } else if ("type" in schema) {
        // SchemaPrimitive
        return { content: schema.type === "int32" ? "number" : "string", importTypes: [] };
    } else if ("ref" in schema) {
        // SchemaRef
        const refType = capitalize(schema.ref);
        return { content: refType, importTypes: [refType] };
    } else if ("enum" in schema) {
        // SchemaLiteralUnion
        return { content: schema.enum.map((item) => `"${item}"`).join(" | "), importTypes: [] };
    } else if ("elements" in schema) {
        // SchemaArray
        // 余計な括弧はフォーマッターで消えるので問題なし
        const typeLiteral = createTypeLiteral(schema.elements, overrideDictionary);
        return { content: `readonly (${typeLiteral.content})[]`, importTypes: typeLiteral.importTypes };
    } else if ("properties" in schema) {
        // SchemaObject | SchemaObjectWithTypeName
        const propertySignatures = [
            ...createPropertySignatures(schema.properties, overrideDictionary, false),
            ...createPropertySignatures(schema.optionalProperties ?? {}, overrideDictionary, true),
        ];
        return {
            content: `{\n${propertySignatures.map(({ content }) => content).join("\n\n")}\n}`,
            importTypes: propertySignatures.flatMap(({ importTypes }) => importTypes),
        };
    } else {
        // schemaはSchemaDiscriminatedUnionObject以外であるべき
        throw new Error("Invalid schema");
    }
};

// type Foo = ... を作る（末尾セミコロンあり、TSDocあり）
const createTypeAliasDeclaration = (
    identifier: string,
    schema: Schema,
    overrideDictionary: Record<string, TypescriptOverride>,
    needsInterfaceAnnotation: boolean,
): OutputWithImports => {
    const comment =
        schema.metadata != null && "description" in schema.metadata
            ? createComment(schema.metadata, needsInterfaceAnnotation)
            : null;
    const { content, importTypes } = createTypeLiteral(schema, overrideDictionary);
    const body = `export type ${capitalize(identifier)} = ${content};`;
    return { content: comment != null ? `${comment}\n${body}` : body, importTypes };
};

// Tagged Union TypeのType Alias Declarationをまとめて作る
const createDiscriminatedUnionObjectTypeAliasDeclarations = (
    identifier: string,
    schema: SchemaDiscriminatedUnionObject,
    overrideDictionary: Record<string, TypescriptOverride>,
): OutputWithImports & { readonly types: readonly string[] } => {
    const baseComment = schema.metadata != null ? createComment(schema.metadata, false) : null;
    const typeAliasDeclarations = Object.entries(schema.mapping).map(([discriminatorValue, childSchema]) => {
        const comment = childSchema.metadata != null ? createComment(childSchema.metadata, true) : null;
        const typeName =
            childSchema.metadata != null
                ? childSchema.metadata.typeName
                : `${capitalize(identifier)}${capitalize(discriminatorValue)}`;
        const discriminatorDescription = schema.metadata?.discriminatorDescription;
        const { content, importTypes } = createTypeLiteral(
            {
                ...childSchema,
                properties: {
                    ...childSchema.properties,
                    [schema.discriminator]:
                        discriminatorDescription != null
                            ? {
                                  metadata: discriminatorDescription,
                                  enum: [discriminatorValue],
                              }
                            : { enum: [discriminatorValue] },
                },
            },
            overrideDictionary,
        );
        const body = `export type ${typeName} = ${content};`;
        return {
            typeName,
            content: comment != null ? `${comment}\n${body}` : body,
            importTypes,
        };
    });
    // type BaseType = Type1 | Type2 | ... | TypeN
    const baseTypeName = capitalize(identifier);
    const baseTypeAliasDeclaration = `export type ${baseTypeName} = ${typeAliasDeclarations
        .map(({ typeName }) => typeName)
        .join(" | ")};`;
    return {
        types: [baseTypeName, ...typeAliasDeclarations.map(({ typeName }) => typeName)],
        content: [
            baseComment != null ? `${baseComment}\n${baseTypeAliasDeclaration}` : baseTypeAliasDeclaration,
            ...typeAliasDeclarations.map(({ content }) => content),
        ].join("\n\n"),
        importTypes: typeAliasDeclarations.flatMap(({ importTypes }) => importTypes),
    };
};

const createTypescriptFiles = (
    overrideDictionary: Record<string, TypescriptOverride>,
    mJsonTypedef: SchemaRoot,
): void => {
    const modules = [
        ["mJson", mJsonTypedef] as [string, Schema],
        ...Object.entries(mJsonTypedef.definitions ?? {}),
    ].map(([identifier, schema]) => {
        if ("discriminator" in schema) {
            const { types, content, importTypes } = createDiscriminatedUnionObjectTypeAliasDeclarations(
                identifier,
                schema,
                overrideDictionary,
            );
            return {
                importMapItems: types.map((type) => [type, identifier] as const),
                content,
                identifier,
                importTypes,
            };
        } else {
            const needsInterfaceAnnotation = "properties" in schema;
            const { content, importTypes } = createTypeAliasDeclaration(
                identifier,
                schema,
                overrideDictionary,
                needsInterfaceAnnotation,
            );
            return {
                importMapItems: [[capitalize(identifier), identifier] as const],
                content,
                identifier,
                importTypes,
            };
        }
    });

    const importMap = new Map(modules.flatMap(({ importMapItems }) => importMapItems));

    for (const { content, identifier, importTypes } of modules) {
        const filepath = `types/${identifier}.ts`;
        const importDeclarationsMap = importTypes.reduce((map, importType) => {
            const from = importMap.get(importType);
            if (from == null) throw Error(`Import map does not contain '${importType}'`);
            const target = map.get(from);
            if (target == null) {
                map.set(from, [importType]);
            } else {
                target.push(importType);
            }
            return map;
        }, new Map<string, string[]>());
        const importDeclarations = [...importDeclarationsMap.entries()].map(
            ([from, importTypes]) =>
                `import { ${importTypes.map((type) => `type ${type}`).join(", ")} } from "./${from}";`,
        );
        fs.writeFileSync(
            filepath,
            importDeclarations.length > 0 ? `${importDeclarations.join("\n")}\n\n${content}` : content,
        );
    }
};

// TODO: typedoc用のファイル出力
// const createDocument = (): void => {};

// import構文でJSONファイルを読み込むとBOMのせいでパースに失敗するので直にYAMLファイルを読み込む
// （PowerShellでYAMLからJSONに変換すると文字エンコードが面倒くさいのでどのみちこっちのほうが良い）
const overrideDictionary = yaml.load(fs.readFileSync("src/typescriptOverride.yaml", "utf8")) as Record<
    string,
    TypescriptOverride
>;
const mJsonTypedef = yaml.load(fs.readFileSync("src/jsonTypedef.yaml", "utf8")) as SchemaRoot;

createTypescriptFiles(overrideDictionary, mJsonTypedef);
