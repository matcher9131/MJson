import type { PlayerGameResult } from "./playerGameResult.ts";
import type { Game } from "./game.ts";

/**
 * 1半荘を示します。
 * @interface
 */
export type MJson = {
    /**
     * MJsonを区別するための数値を示します。
     * 
     * 麻雀の内容には影響しません。
     */
    readonly id: number;

    /**
     * 各プレイヤーの名前や結果を示す{@link PlayerGameResult}の配列です。
     * 
     * 起家から反時計回りの順で記述します。
     */
    readonly players: readonly PlayerGameResult[];

    /**
     * それぞれの局を示す{@link Game}の配列です。
     * 
     * 東1局0本場から順に記述します。
     */
    readonly games: readonly Game[];
};
