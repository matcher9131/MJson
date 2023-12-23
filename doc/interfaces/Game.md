[MJson](../modules.md) / Game

# Interface: Game

1局を示します。

## Table of contents

### Properties

- [beginningScores](Game.md#beginningscores)
- [bets](Game.md#bets)
- [dealerKeepingCount](Game.md#dealerkeepingcount)
- [dealtTiles](Game.md#dealttiles)
- [dora](Game.md#dora)
- [events](Game.md#events)
- [gameResults](Game.md#gameresults)
- [hiddenDora](Game.md#hiddendora)
- [round](Game.md#round)

## Properties

### beginningScores

• `Readonly` **beginningScores**: readonly `number`[]

局開始時の各プレイヤーの点棒を示す数値の配列です。

**`Remarks`**

起家から反時計回りの順で記述します。

___

### bets

• `Readonly` **bets**: `number`

局開始時における供託棒の本数を示す数値です。

___

### dealerKeepingCount

• `Readonly` **dealerKeepingCount**: `number`

積み棒の本数を示す数値です。

___

### dealtTiles

• `Readonly` **dealtTiles**: readonly readonly number[][]

各プレイヤーの配牌を示す数値の2次元配列です。

**`Remarks`**

起家から順に反時計回りに記述します。（すなわち、dealtTiles[0]が起家の配牌、dealtTiles[1]が起家の下家の配牌、...を示します。）

親であってもはじめの13枚のみを記述します。

___

### dora

• `Readonly` **dora**: readonly `number`[]

ドラ表示牌を示す数値の配列です。

**`Remarks`**

めくられた枚数分だけ順に記述します。

___

### events

• `Readonly` **events**: readonly [`EventItem`](../modules.md#eventitem)[]

各プレイヤーのツモ、打牌、鳴きなどの行動を表す[EventItem](../modules.md#eventitem)の配列です。

**`Remarks`**

親の第一ツモから順に記述します。

___

### gameResults

• `Readonly` **gameResults**: readonly [`GameResult`](../modules.md#gameresult)[]

1局の結果（和了または流局）を示す[GameResult](../modules.md#gameresult)の配列です。

**`Remarks`**

配列の内容はちょうど1個の[GameResultDraw](GameResultDraw.md)か、1個以上の[GameResultWin](GameResultWin.md)のいずれかのみが許されます。

2人以上がロンした場合、放銃者から見て下家となるプレイヤーから順に記述します。

___

### hiddenDora

• `Optional` `Readonly` **hiddenDora**: readonly `number`[]

裏ドラ表示牌を示す数値の配列です。

**`Remarks`**

めくられた枚数分だけ順に記述します。

リーチをして和了したプレイヤーがいない場合はこのプロパティを含めないようにします。

___

### round

• `Readonly` **round**: `number`

局を示す数値です。

**`Remarks`**

0 = 東1局, 1 = 東2局, 2 = 東3局, 3 = 東4局, 4 = 南1局, ...を示します。
