[MJson](../modules.md) / GameResultWin

# Interface: GameResultWin

和了者がいることを示す[GameResult](../modules.md#gameresult)です。

## Table of contents

### Properties

- [from](GameResultWin.md#from)
- [pao](GameResultWin.md#pao)
- [player](GameResultWin.md#player)
- [points](GameResultWin.md#points)
- [resultKind](GameResultWin.md#resultkind)
- [scoreIncrements](GameResultWin.md#scoreincrements)
- [winScore](GameResultWin.md#winscore)
- [yakuList](GameResultWin.md#yakulist)

## Properties

### from

• `Optional` `Readonly` **from**: `number`

どのプレイヤーからロンしたかを示す数値です。

ツモ和がりの場合はこのプロパティを含めないようにします。

___

### pao

• `Optional` `Readonly` **pao**: `number`

責任払いの対象プレイヤーを示す数値です。

責任払いの対象プレイヤーがいない場合はこのプロパティを含めないようにします。

___

### player

• `Readonly` **player**: `number`

どのプレイヤーが和了したかを示す数値です。

___

### points

• `Readonly` **points**: `number`

符を示します。

___

### resultKind

• `Readonly` **resultKind**: ``"win"``

1局の結果が何であるかを表す文字列です。

和了者がいる場合は`"win"`を指定します。

___

### scoreIncrements

• `Readonly` **scoreIncrements**: readonly `number`[]

和了および流局による点棒の増減（積み棒、供託を含む）を示す数値の配列です。

起家から反時計回りの順で記述します。

**`Remarks`**

増減の基準は局開始時ではなく、最後の[EventItem](../modules.md#eventitem)の直後
（複数人がロンした場合の2人目以降は、直前の和了者の点棒清算が終わった直後）とします。

___

### winScore

• `Readonly` **winScore**: `number`

積み棒や供託を含めない純粋な和了点を示します。

___

### yakuList

• `Readonly` **yakuList**: readonly `YakuDoubles`[]

役と飜数を示す[YakuDoubles](YakuDoubles.md)の配列です。
