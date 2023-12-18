[MJson](../modules.md) / EventOpenKong

# Interface: EventOpenKong

大明槓を示す[EventItem](../modules.md#eventitem)です。

## Table of contents

### Properties

- [from](EventOpenKong.md#from)
- [k](EventOpenKong.md#k)
- [p](EventOpenKong.md#p)
- [t](EventOpenKong.md#t)
- [tiles](EventOpenKong.md#tiles)

## Properties

### from

• `Readonly` **from**: `number`

どのプレイヤーの打牌をもらったのかを表す数値です。

___

### k

• `Readonly` **k**: ``"m"``

イベントタイプを指定する文字列です。大明槓には`"m"`を指定します。

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

晒した残りの3牌を示す数値の配列です。
