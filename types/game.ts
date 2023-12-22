import { EventItem } from "./eventItem";
import { GameResult } from "./gameResult";

/**
 * 1局を示します。
 *
 * @interface
 */
export type Game = {
    /**
     * 局開始時の各プレイヤーの点棒を示す数値の配列です。
     *
     * @remarks
     * 起家から反時計回りの順で記述します。
     */
    readonly beginningScores: readonly number[];

    /**
     * 局を示す数値です。
     *
     * @remarks
     * 0 = 東1局, 1 = 東2局, 2 = 東3局, 3 = 東4局, 4 = 南1局, ...を示します。
     */
    readonly round: number;

    /**
     * 積み棒の本数を示す数値です。
     */
    readonly dealerKeepingCount: number;

    /**
     * 局開始時における供託棒の本数を示す数値です。
     */
    readonly bets: number;

    /**
     * ドラ表示牌を示す数値の配列です。
     *
     * @remarks
     * めくられた枚数分だけ順に記述します。
     */
    readonly dora: readonly number[];

    /**
     * 各プレイヤーの配牌を示す数値の2次元配列です。
     *
     * @remarks
     * 起家から順に反時計回りに記述します。（すなわち、dealtTiles[0]が起家の配牌、dealtTiles[1]が起家の下家の配牌、...を示します。）
     *
     * 親であってもはじめの13枚のみを記述します。
     */
    readonly dealtTiles: readonly (readonly number[])[];

    /**
     * 各プレイヤーのツモ、打牌、鳴きなどの行動を表す{@link EventItem}の配列です。
     *
     * @remarks
     * 親の第一ツモから順に記述します。
     */
    readonly events: readonly EventItem[];

    /**
     * 1局の結果（和了または流局）を示す{@link GameResult}の配列です。
     *
     * @remarks
     * 配列の内容はちょうど1個の{@link GameResultDraw}か、1個以上の{@link GameResultWin}のいずれかのみが許されます。
     *
     * 2人以上がロンした場合、放銃者から見て下家となるプレイヤーから順に記述します。
     */
    readonly gameResults: readonly GameResult[];

    /**
     * 裏ドラ表示牌を示す数値の配列です。
     *
     * @remarks
     * めくられた枚数分だけ順に記述します。
     *
     * リーチをして和了したプレイヤーがいない場合はこのプロパティを含めないようにします。
     */
    readonly hiddenDora?: readonly number[];
};
