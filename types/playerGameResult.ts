/**
 * プレイヤー名と半荘の結果を示します。
 * @interface
 */
export type PlayerGameResult = {
    /**
     * プレイヤー名を示す文字列です。
     */
    readonly name: string;

    /**
     * 点棒を示す数値です。
     */
    readonly score: number;

    /**
     * 清算ポイントを示す数値です。
     */
    readonly income: number;

    /**
     * 順位を示す数値です。
     * 
     * 0が1位、1が2位、...を示します。
     */
    readonly rank: number;
};
