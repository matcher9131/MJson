/**
 * 役と飜数を示します。
 * @interface
 */
export type YakuDoubles = {
    /**
     * 役のIDを示す数値です。`types/yaku.ts`に対応します。
     * 
     * このプロパティか{@link yaku}のいずれかを指定する必要があります。
     */
    yakuId?: number;

    /**
     * 役名を示す文字列です。
     * 
     * このプロパティか{@link yakuId}のいずれかを指定する必要があります。
     */
    yaku?: string;

    /**
     * 飜数を示す数値です。
     * 
     * 役満には13、ダブル役満には26を指定します。
     */
    doubles: number;
}