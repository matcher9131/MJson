/**
 * ツモ、打牌、鳴きなどの各行動を示す抽象タイプです。
 *
 * @remarks
 * 共通プロパティ`k`によってどの種別なのかを判断できます。
 */
export type EventItem =
    | EventDiscard
    | EventDraw
    | EventChow
    | EventPung
    | EventConcealedKong
    | EventOpenKong
    | EventAdditionalKong;

/**
 * 打牌を示す{@link EventItem}です。
 *
 * @interface
 */
export type EventDiscard = {
    /**
     * どのプレイヤーのイベントなのかを示す数値です。
     */
    readonly p: number;

    /**
     * どの牌を打牌したのかを示す数値です。
     */
    readonly t: number;

    /**
     * イベントタイプを指定する文字列です。
     */
    readonly k: "d";

    /**
     * 打牌時にリーチ宣言をしたかどうかを示します。
     *
     * @remarks
     * このプロパティが省略されたときは`false`が指定されたものとします。
     */
    readonly isRiichi?: boolean;
};

/**
 * ツモを示す{@link EventItem}です。
 *
 * @interface
 */
export type EventDraw = {
    /**
     * どのプレイヤーのイベントなのかを示す数値です。
     */
    readonly p: number;

    /**
     * どの牌をツモしたのかを示す数値です。
     */
    readonly t: number;

    /**
     * イベントタイプを指定する文字列です。
     */
    readonly k: "t";
};

/**
 * チーを示す{@link EventItem}です。
 *
 * @interface
 */
export type EventChow = {
    /**
     * どのプレイヤーのイベントなのかを示す数値です。
     */
    readonly p: number;

    /**
     * どのプレイヤーの打牌をもらったのかを表す数値です。
     */
    readonly from: number;

    /**
     * もらった牌を示す数値です。
     */
    readonly t: number;

    /**
     * 晒した残りの2牌を示す数値の配列です。
     */
    readonly tiles: readonly number[];

    /**
     * イベントタイプを指定する文字列です。
     */
    readonly k: "c";
};

/**
 * ポンを示す{@link EventItem}です。
 *
 * @interface
 */
export type EventPung = {
    /**
     * どのプレイヤーのイベントなのかを示す数値です。
     */
    readonly p: number;

    /**
     * どのプレイヤーの打牌をもらったのかを表す数値です。
     */
    readonly from: number;

    /**
     * もらった牌を示す数値です。
     */
    readonly t: number;

    /**
     * 晒した残りの2牌を示す数値の配列です。
     */
    readonly tiles: readonly number[];

    /**
     * イベントタイプを指定する文字列です。
     */
    readonly k: "p";
};

/**
 * 暗槓を示す{@link EventItem}です。
 *
 * @interface
 */
export type EventConcealedKong = {
    /**
     * どのプレイヤーのイベントなのかを示す数値です。
     */
    readonly p: number;

    /**
     * 暗槓を行う4牌を示す数値の配列です。
     */
    readonly tiles: readonly number[];

    /**
     * イベントタイプを指定する文字列です。
     */
    readonly k: "a";
};

/**
 * 大明槓を示す{@link EventItem}です。
 *
 * @interface
 */
export type EventOpenKong = {
    /**
     * どのプレイヤーのイベントなのかを示す数値です。
     */
    readonly p: number;

    /**
     * どのプレイヤーの打牌をもらったのかを表す数値です。
     */
    readonly from: number;

    /**
     * もらった牌を示す数値です。
     */
    readonly t: number;

    /**
     * 晒した残りの3牌を示す数値の配列です。
     */
    readonly tiles: readonly number[];

    /**
     * イベントタイプを指定する文字列です。
     */
    readonly k: "m";
};

/**
 * 小明槓を示す{@link EventItem}です。
 *
 * @interface
 */
export type EventAdditionalKong = {
    /**
     * どのプレイヤーのイベントなのかを示す数値です。
     */
    readonly p: number;

    /**
     * どの牌を加えたのかを示す数値です。
     */
    readonly t: number;

    /**
     * イベントタイプを指定する文字列です。
     */
    readonly k: "k";
};
