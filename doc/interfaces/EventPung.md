[MJson](../modules.md) / EventPung

# Interface: EventPung

ポンを示す[EventItem](../modules.md#eventitem)です。

## Table of contents

### Properties

- [from](EventPung.md#from)
- [k](EventPung.md#k)
- [p](EventPung.md#p)
- [t](EventPung.md#t)
- [tiles](EventPung.md#tiles)

## Properties

### from

• `Readonly` **from**: `number`

どのプレイヤーの打牌をもらったのかを表す数値です。

___

### k

• `Readonly` **k**: ``"p"``

イベントタイプを指定する文字列です。ポンには`"m"`を指定します。

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
