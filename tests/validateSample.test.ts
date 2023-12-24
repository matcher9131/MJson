import { describe, expect, test } from "vitest";
import { type Schema, validate } from "jtd";
import * as yaml from "js-yaml";
import * as fs from "fs";
import sample1 from "../samples/sample1.json";
import sample2 from "../samples/sample2.json";
import sample3 from "../samples/sample3.json";
import sample4 from "../samples/sample4.json";
import sample5 from "../samples/sample5.json";

describe("samples", () => {
    const schema = yaml.load(fs.readFileSync("src/jsonTypedef.yaml", "utf8")) as Schema;

    test("sample1がValidationを通る", () => {
        const errors = validate(schema, sample1);
        expect(errors.length).toBe(0);
    });

    test("sample2がValidationを通る", () => {
        const errors = validate(schema, sample2);
        expect(errors.length).toBe(0);
    });

    test("sample3がValidationを通る", () => {
        const errors = validate(schema, sample3);
        expect(errors.length).toBe(0);
    });

    test("sample4がValidationを通る", () => {
        const errors = validate(schema, sample4);
        expect(errors.length).toBe(0);
    });

    test("sample5がValidationを通る", () => {
        const errors = validate(schema, sample5);
        expect(errors.length).toBe(0);
    });
});
