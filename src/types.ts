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

type MetadataOverride = {
    typescriptOverride: Schema | { union: readonly Schema[] };
};

export type Metadata = MetadataDescription | MetadataDiscriminatorDescription | MetadataTypeName | MetadataOverride;
