[MJson](../README.md) / [Exports](../modules.md) / EventChow

# Interface: EventChow

チーを示す[EventItem](../modules.md#eventitem)です。

## Table of contents

### Properties

- [from](EventChow.md#from)
- [k](EventChow.md#k)
- [p](EventChow.md#p)
- [t](EventChow.md#t)
- [tiles](EventChow.md#tiles)

## Properties

### from

• `Readonly` **from**: `number`

どのプレイヤーの打牌をもらったのかを表す数値です。

___

### k

• `Readonly` **k**: ``"c"``

イベントタイプを指定する文字列です。チーには`"c"`を指定します。

___

### p

• `Readonly` **p**: `number`

どのプレイヤーのイベントなのかを示す数値です。

___

### t

• `Readonly` **t**: `number`

もらった牌を示す数値です。

___

### tiles

• `Readonly` **tiles**: readonly `number`[]

晒した残りの2牌を示す数値の配列です。
