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
    overrideDictionary: Record<string, TypescriptOverride> | null,
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
    overrideDictionary: Record<string, TypescriptOverride> | null,
): OutputWithImports => {
    if (overrideDictionary != null && schema.metadata != null && "typescriptOverride" in schema.metadata) {
        // overrideDictionaryが指定されていて、かつmetadataがMetadataOverrideならそちらを優先する
        const overrideSchema = overrideDictionary[schema.metadata.typescriptOverride];
        if (overrideSchema == null) throw new Error("ERROR: Override schema is not found.");
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
        throw new Error("ERROR: Invalid schema");
    }
};

// type Foo = ... を作る（末尾セミコロンあり、TSDocあり）
const createTypeAliasDeclaration = (
    identifier: string,
    schema: Schema,
    overrideDictionary: Record<string, TypescriptOverride> | null,
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
    overrideDictionary: Record<string, TypescriptOverride> | null,
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

type Module = {
    readonly filename: string;
    readonly content: string;
    readonly importTypes: readonly string[];
    readonly exportTypes: readonly string[];
};
const createModules = (
    keySchemaPair: ReadonlyArray<[string, Schema]>,
    overrideDictionary: Record<string, TypescriptOverride> | null,
): Module[] => {
    return keySchemaPair.map(([identifier, schema]) => {
        if ("discriminator" in schema) {
            const { types, content, importTypes } = createDiscriminatedUnionObjectTypeAliasDeclarations(
                identifier,
                schema,
                overrideDictionary,
            );
            return {
                filename: identifier,
                content,
                importTypes,
                exportTypes: types,
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
                filename: identifier,
                content,
                importTypes,
                exportTypes: [capitalize(identifier)],
            };
        }
    });
};

const generateModuleFiles = (modules: readonly Module[], directoryPath: string): void => {
    const typeModuleDic = new Map(
        modules.flatMap(({ filename, exportTypes }) => exportTypes.map((type) => [type, filename] as const)),
    );

    for (const { content, filename, importTypes } of modules) {
        const filepath = `${directoryPath}/${filename}.ts`;
        const importDeclarationsMap = importTypes.reduce((map, importType) => {
            const from = typeModuleDic.get(importType);
            if (from == null) throw Error(`ERROR: Import map does not contain '${importType}'`);
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

// types用のTypeScriptファイルを作る
// （TSDocを付けたいのでjtd-codegenは使わない）
const generateTypeFiles = (mJsonTypedef: SchemaRoot, overrideDictionary: Record<string, TypescriptOverride>): void => {
    const modules = createModules(
        [["mJson", mJsonTypedef] as [string, Schema], ...Object.entries(mJsonTypedef.definitions ?? {})],
        overrideDictionary,
    );
    generateModuleFiles(modules, "src/types");

    // index.ts
    const body = [
        ...modules.map(({ filename }) => `export * from "./types/${filename}";`),
        `export * from "./types/yaku"`,
    ].join("\n");
    fs.writeFileSync("src/index.ts", body);
};

// TypeDoc用のTypeScriptファイルを作る
const generateTypeDocFiles = (mJsonTypedef: SchemaRoot): void => {
    const modules = createModules(
        [["mJson", mJsonTypedef] as [string, Schema], ...Object.entries(mJsonTypedef.definitions ?? {})],
        null,
    );
    generateModuleFiles(modules, "src/generator/doc");

    // index.ts
    fs.writeFileSync(
        "src/generator/doc/index.ts",
        modules.map(({ filename }) => `export * from "./${filename}";`).join("\n"),
    );
};

const main = (): void => {
    // PowerShellでYAMLからJSONに変換すると文字エンコードが面倒くさいのでYAMLを直接読み込む
    const overrideDictionary = yaml.load(fs.readFileSync("src/generator/typescriptOverride.yaml", "utf8")) as Record<
        string,
        TypescriptOverride
    >;
    const mJsonTypedef = yaml.load(fs.readFileSync("src/jsonTypedef.yaml", "utf8")) as SchemaRoot;

    fs.writeFileSync("src/jsonTypedef.json", JSON.stringify(mJsonTypedef, undefined, 4));

    generateTypeFiles(mJsonTypedef, overrideDictionary);

    generateTypeDocFiles(mJsonTypedef);
};

main();
