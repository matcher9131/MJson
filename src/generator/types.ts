// Schemaの種類によって持たせたいMetadataが変わるので、jtdで定義されたものは使わない

export type SchemaBase = {
    readonly metadata?: Metadata;
};

export type SchemaObject = SchemaBase & {
    readonly properties: Record<string, Schema>;
    readonly optionalProperties?: Record<string, Schema>;
};

export type SchemaObjectWithTypeName = SchemaObject & {
    readonly metadata?: MetadataTypeName;
};

export type SchemaDiscriminatedUnionObject = {
    readonly metadata?: MetadataDiscriminatorDescription;
    readonly discriminator: string;
    readonly mapping: Record<string, SchemaObjectWithTypeName>;
};

export type SchemaRef = SchemaBase & {
    readonly ref: string;
};

export type SchemaArray = SchemaBase & {
    readonly elements: Schema;
};

export type SchemaPrimitive = SchemaBase & {
    readonly type: "int32" | "string";
};

export type SchemaLiteralUnion = SchemaBase & {
    readonly enum: readonly string[];
};

export type Schema =
    | SchemaObject
    | SchemaDiscriminatedUnionObject
    | SchemaRef
    | SchemaArray
    | SchemaPrimitive
    | SchemaLiteralUnion;

export type SchemaRoot = Schema & {
    readonly definitions?: Record<string, Schema>;
};

export type MetadataDescription = {
    readonly description: string | readonly string[];
    readonly remarks?: string | readonly string[];
};

type MetadataDiscriminatorDescription = MetadataDescription & {
    readonly discriminatorDescription: MetadataDescription;
};

type MetadataTypeName = MetadataDescription & {
    readonly typeName: string;
};

type MetadataOverride = MetadataDescription & {
    readonly typescriptOverride: string;
};

export type Metadata = MetadataDescription | MetadataDiscriminatorDescription | MetadataTypeName | MetadataOverride;

export type TypescriptOverride = { readonly union: readonly Schema[] };
