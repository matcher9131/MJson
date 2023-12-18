[MJson](../modules.md) / MJson

# Interface: MJson

1半荘を示します。

## Table of contents

### Properties

- [games](MJson.md#games)
- [id](MJson.md#id)
- [players](MJson.md#players)

## Properties

### games

• `Readonly` **games**: readonly [`Game`](Game.md)[]

それぞれの局を示す[Game](Game.md)の配列です。

東1局0本場から順に記述します。

___

### id

• `Readonly` **id**: `number`

MJsonを区別するための数値を示します。

麻雀の内容には影響しません。

___

### players

• `Readonly` **players**: readonly [`PlayerGameResult`](PlayerGameResult.md)[]

各プレイヤーの名前や結果を示す[PlayerGameResult](PlayerGameResult.md)の配列です。

起家から反時計回りの順で記述します。
