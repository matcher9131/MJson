[MJson](README.md) / Exports

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
- [PlayerGameResult](interfaces/PlayerGameResult.md)
- [YakuDoubles](interfaces/YakuDoubles.md)

### Type Aliases

- [EventItem](modules.md#eventitem)
- [GameResult](modules.md#gameresult)

## Type Aliases

### EventItem

Ƭ **EventItem**: [`EventAdditionalKong`](interfaces/EventAdditionalKong.md) \| [`EventChow`](interfaces/EventChow.md) \| [`EventConcealedKong`](interfaces/EventConcealedKong.md) \| [`EventOpenKong`](interfaces/EventOpenKong.md) \| [`EventPung`](interfaces/EventPung.md) \| [`EventDiscard`](interfaces/EventDiscard.md) \| [`EventDraw`](interfaces/EventDraw.md)

ツモ、打牌、鳴きなどの各行動を示す抽象タイプです。

具体的には以下のいずれかを示します。

- EventAdditionalKong
- EventChow
- EventConcealedKong
- EventDiscard
- EventDraw
- EventOpenKong
- EventPung

共通プロパティ`k`によってどの種別なのかを判断できます。

___

### GameResult

Ƭ **GameResult**: [`GameResultWin`](interfaces/GameResultWin.md) \| [`GameResultDraw`](interfaces/GameResultDraw.md)

1局の結果を示す抽象タイプです。

具体的には以下のいずれかを示します。

- GameResultWin
- GameResultDraw

共通プロパティ`kind`によってどの種別なのかを判断できます。
