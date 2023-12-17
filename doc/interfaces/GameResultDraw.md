[MJson](../README.md) / [Exports](../modules.md) / GameResultDraw

# Interface: GameResultDraw

流局を示す[GameResult](../modules.md#gameresult)です。

## Table of contents

### Properties

- [drawKind](GameResultDraw.md#drawkind)
- [resultKind](GameResultDraw.md#resultkind)
- [scoreIncrements](GameResultDraw.md#scoreincrements)

## Properties

### drawKind

• `Readonly` **drawKind**: ``"荒牌平局"`` \| ``"九種九牌"`` \| ``"四家立直"`` \| ``"三家和"`` \| ``"四開槓"`` \| ``"四風連打"`` \| ``"流し満貫"``

流局した理由を示す文字列です。

___

### resultKind

• `Readonly` **resultKind**: ``"draw"``

1局の結果が何であるかを表す文字列です。

流局の場合は`"draw"`を指定します。

___

### scoreIncrements

• `Readonly` **scoreIncrements**: readonly `number`[]

和了および流局による点棒の増減（積み棒、供託を含む）を示す数値の配列です。

起家から反時計回りの順で記述します。

**`Remarks`**

増減の基準は局開始時ではなく、最後の[EventItem](../modules.md#eventitem)の直後
（複数人がロンした場合の2人目以降は、直前の和了者の点棒清算が終わった直後）とします。
