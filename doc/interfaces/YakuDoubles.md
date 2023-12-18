[MJson](../modules.md) / YakuDoubles

# Interface: YakuDoubles

役と飜数を示します。

## Table of contents

### Properties

- [doubles](YakuDoubles.md#doubles)
- [yaku](YakuDoubles.md#yaku)
- [yakuId](YakuDoubles.md#yakuid)

## Properties

### doubles

• **doubles**: `number`

飜数を示す数値です。

役満には13、ダブル役満には26を指定します。

___

### yaku

• `Optional` **yaku**: `string`

役名を示す文字列です。

このプロパティか[yakuId](YakuDoubles.md#yakuid)のいずれかを指定する必要があります。

___

### yakuId

• `Optional` **yakuId**: `number`

役のIDを示す数値です。`types/yaku.ts`に対応します。

このプロパティか[yaku](YakuDoubles.md#yaku)のいずれかを指定する必要があります。
