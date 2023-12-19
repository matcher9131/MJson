type JsonSchemaBase = {
    readonly description: string;
};

type UnresolvedJsonSchemaObject = JsonSchemaBase & {
    readonly type: "unresolved";
    readonly typeName: string;
};

type JsonSchemaObject = JsonSchemaBase & {
    readonly type: "object";
    readonly properties: Record<string, JsonSchema>;
    readonly reqired: readonly string[];
};

type JsonSchemaArray = JsonSchemaBase & {
    readonly type: "array";
    readonly items: JsonSchema;
};

type JsonSchemaPrimitive = JsonSchemaBase & {
    readonly type: "string" | "number" | "integer" | "boolean" | "null";
};

export type JsonSchema = UnresolvedJsonSchemaObject | JsonSchemaObject | JsonSchemaArray | JsonSchemaPrimitive;

const isUnresolvedJsonSchemaObject = (schema: JsonSchema): schema is UnresolvedJsonSchemaObject =>
    schema.type === "unresolved";
const isJsonSchemaObject = (schema: JsonSchema): schema is JsonSchemaObject => schema.type === "object";
const isJsonSchemaArray = (schema: JsonSchema): schema is JsonSchemaArray => schema.type === "array";
const isJsonSchemaPrimitive = (schema: JsonSchema): schema is JsonSchemaPrimitive =>
    schema.type === "string" ||
    schema.type === "number" ||
    schema.type === "integer" ||
    schema.type === "boolean" ||
    schema.type === "null";

const getUnresolvedTypeNames = (schema: JsonSchema): string[] => {
    if (isUnresolvedJsonSchemaObject(schema)) {
        return [schema.typeName];
    } else if (isJsonSchemaArray(schema)) {
        return getUnresolvedTypeNames(schema.items);
    } else if (isJsonSchemaPrimitive(schema)) {
        return [];
    } else {
        return Object.entries(schema.properties).flatMap(([_, childSchema]) => getUnresolvedTypeNames(childSchema));
    }
};

const resolveJsonSchemaMap = (unresolvedMap: ReadonlyMap<string, JsonSchema>): Map<string, ResolvedJsonSchema> => {
    const graph = new Map<string | symbol, Array<string | symbol>>();
    // NOT IMPLEMENTED
    for (const [key, value] of unresolvedMap) {
    }
};
