# MJson

JSONをベースとした独自形式の牌譜フォーマットです。

# 特長
- 簡素な記述で1半荘の牌譜を記録できます。
- [JSON Typedef (jtd)](https://jsontypedef.com/)によりスキーマが定義されているため、jtdや[ajv](https://ajv.js.org/)などでバリデーションが行えます。
    - jtdにより各種言語における型定義の作成も簡単に行えます。
- JSONをベースとしているため、柔軟な拡張性を持ちます。

# インストール

```
npm install -D @matcher9131/mjson
```

または

```
yarn add -dev @matcher9131/mjson
```

# 使い方

## Typescript

`MJson`や他の定義されたタイプをインポートすることで型付きの変数として扱えます。

```ts
import { MJson } from "@matcher9131/mjson";
import data from "./foo.json"; // 対象となるMJsonファイル

const mJson = data as MJson;
console.log(mJson.players[0].name);
```

## バリデーション

jtdを用いてNode.jsでMJsonのバリデーションを行う例です。

```js
import { validate } from "jtd";
import schema from "@matcher9131/mjson/jsonTypedef" assert { type: "json" };
import data from "./foo.json" assert { type: "json" }; // 対象となるMJsonファイル

const errors = validate(schema, data);
console.log(`Number of errors: ${errors.length}`);
```

# ドキュメント

型定義は[こちら](https://github.com/matcher9131/MJson/blob/main/doc/modules.md)をご覧ください。
