import { type PlayerMatchResult } from "./playerMatchResult";
import { type Game } from "./game";

/**
 * 1半荘を示します。
 *
 * @interface
 */
export type MJson = {
    /**
     * MJsonを区別するための数値を示します。
     *
     * @remarks
     * 麻雀の内容には影響しません。
     */
    readonly id: number;

    /**
     * 各プレイヤーの名前や結果を示す{@link PlayerMatchResult}の配列です。
     *
     * @remarks
     * 起家から反時計回りの順で記述します。
     */
    readonly players: readonly PlayerMatchResult[];

    /**
     * それぞれの局を示す{@link Game}の配列です。
     *
     * @remarks
     * 東1局0本場から順に記述します。
     */
    readonly games: readonly Game[];
};
