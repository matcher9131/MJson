import type { DrawKind } from "./drawKind.ts";
import type { YakuDoubles } from "./yakuDoubles.ts";

type GameResultBase = {
    readonly resultKind: "win" | "draw";

    /**
     * 和了および流局による点棒の増減（積み棒、供託を含む）を示す数値の配列です。
     * 
     * 起家から反時計回りの順で記述します。
     * 
     * @remarks
     * 増減の基準は局開始時ではなく、最後の{@link EventItem}の直後
     * （複数人がロンした場合の2人目以降は、直前の和了者の点棒清算が終わった直後）とします。
     */
    readonly scoreIncrements: readonly number[];
};

/**
 * 和了者がいることを示す{@link GameResult}です。
 * @interface
 */
export type GameResultWin = GameResultBase & {
    /**
     * 1局の結果が何であるかを表す文字列です。
     * 
     * 和了者がいる場合は`"win"`を指定します。
     */
    readonly resultKind: "win";

    /**
     * どのプレイヤーが和了したかを示す数値です。
     */
    readonly player: number;

    /**
     * どのプレイヤーからロンしたかを示す数値です。
     * 
     * ツモ和がりの場合はこのプロパティを含めないようにします。
     */
    readonly from?: number;

    /**
     * 責任払いの対象プレイヤーを示す数値です。
     * 
     * 責任払いの対象プレイヤーがいない場合はこのプロパティを含めないようにします。
     */
    readonly pao?: number;

    /**
     * 積み棒や供託を含めない純粋な和了点を示します。
     */
    readonly winScore: number;

    /**
     * 符を示します。
     */
    readonly points: number;

    /**
     * 役と飜数を示す{@link YakuDoubles}の配列です。
     */
    readonly yakuList: readonly YakuDoubles[];
};

/**
 * 流局を示す{@link GameResult}です。
 * @interface
 */
export type GameResultDraw = GameResultBase & {
    /**
     * 1局の結果が何であるかを表す文字列です。
     * 
     * 流局の場合は`"draw"`を指定します。
     */
    readonly resultKind: "draw";

    /**
     * 流局した理由を示す文字列です。
     */
    readonly drawKind: DrawKind;
};

/** 
 * 1局の結果を示す抽象タイプです。
 * 
 * 具体的には以下のいずれかを示します。
 * 
 * - GameResultWin
 * - GameResultDraw
 * 
 * 共通プロパティ`kind`によってどの種別なのかを判断できます。
 */
export type GameResult = GameResultWin | GameResultDraw;
