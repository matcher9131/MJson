日本語のREADMEは[こちら](README.ja.md)

# MJson

A schema of Mahjong record based on JSON

# Features

- Record whole game of Mahjong with easy description
- Use [JSON Typedef (jtd)](https://jsontypedef.com/)
    - Validate data by validators like jtd, [ajv](https://ajv.js.org/) and so on
    - Generate native types in your programming language
- Extend schema easily if you need

# Installation

```
npm install -D @matcher9131/mjson
```

or 

```
yarn add -dev @matcher9131/mjson
```

# Usage

## Typescript: Import types

You can use MJson as typed variant by importing type.

```typescript
import { MJson } from "mjson";
import data from "./foo.json"; // Import MJson file you like

const mJson = data as MJson;
console.log(mJson.players[0].name);
```

## Validation 
```javascript

```

# Documentation

[Type definition](doc/modules.md) (Sorry, available only in Japanese currently)