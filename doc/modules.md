MJson

# MJson

## Table of contents

### Interfaces

- [EventAdditionalKong](interfaces/EventAdditionalKong.md)
- [EventChow](interfaces/EventChow.md)
- [EventConcealedKong](interfaces/EventConcealedKong.md)
- [EventDiscard](interfaces/EventDiscard.md)
- [EventDraw](interfaces/EventDraw.md)
- [EventOpenKong](interfaces/EventOpenKong.md)
- [EventPung](interfaces/EventPung.md)
- [Game](interfaces/Game.md)
- [GameResultDraw](interfaces/GameResultDraw.md)
- [GameResultWin](interfaces/GameResultWin.md)
- [MJson](interfaces/MJson.md)
- [PlayerMatchResult](interfaces/PlayerMatchResult.md)
- [YakuDoubles](interfaces/YakuDoubles.md)

### Type Aliases

- [DrawKind](modules.md#drawkind)
- [EventItem](modules.md#eventitem)
- [GameResult](modules.md#gameresult)

## Type Aliases

### DrawKind

Ƭ **DrawKind**: ``"荒牌平局"`` \| ``"九種九牌"`` \| ``"四家立直"`` \| ``"三家和"`` \| ``"四開槓"`` \| ``"四風連打"`` \| ``"流し満貫"``

流局の理由です。

___

### EventItem

Ƭ **EventItem**: [`EventDiscard`](interfaces/EventDiscard.md) \| [`EventDraw`](interfaces/EventDraw.md) \| [`EventChow`](interfaces/EventChow.md) \| [`EventPung`](interfaces/EventPung.md) \| [`EventConcealedKong`](interfaces/EventConcealedKong.md) \| [`EventOpenKong`](interfaces/EventOpenKong.md) \| [`EventAdditionalKong`](interfaces/EventAdditionalKong.md)

ツモ、打牌、鳴きなどの各行動を示す抽象タイプです。

**`Remarks`**

共通プロパティ`k`によってどの種別なのかを判断できます。

___

### GameResult

Ƭ **GameResult**: [`GameResultWin`](interfaces/GameResultWin.md) \| [`GameResultDraw`](interfaces/GameResultDraw.md)

1局の結果を示す抽象タイプです。

**`Remarks`**

共通プロパティ`resultKind`によってどの種別なのかを判断できます。
