[MJson](../modules.md) / EventDiscard

# Interface: EventDiscard

打牌を示す[EventItem](../modules.md#eventitem)です。

## Table of contents

### Properties

- [isRiichi](EventDiscard.md#isriichi)
- [k](EventDiscard.md#k)
- [p](EventDiscard.md#p)
- [t](EventDiscard.md#t)

## Properties

### isRiichi

• `Optional` `Readonly` **isRiichi**: `boolean`

打牌時にリーチ宣言をしたかどうかを示します。

**`Remarks`**

このプロパティが省略されたときは`false`が指定されたものとします。

___

### k

• `Readonly` **k**: ``"d"``

イベントタイプを指定する文字列です。

___

### p

• `Readonly` **p**: `number`

どのプレイヤーのイベントなのかを示す数値です。

___

### t

• `Readonly` **t**: `number`

どの牌を打牌したのかを示す数値です。
