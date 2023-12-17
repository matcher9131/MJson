type EventItemBase = {
    readonly k: "t" | "d" | "c" | "p" | "a" | "m" | "k";

    /**
     * どのプレイヤーのイベントなのかを示す数値です。
     */
    readonly p: number;
};

/**
 * 打牌を示す{@link EventItem}です。
 * @interface
 */
export type EventDiscard = EventItemBase & {
    /**
     * イベントタイプを指定する文字列です。打牌には`"k"`を指定します。
     */
    readonly k: "d";

    /**
     * どの牌を打牌したのかを示す数値です。
     */
    readonly t: number;

    /**
     * 打牌時にリーチ宣言をしたかどうかを示します。
     */
    readonly isRiichi?: boolean;
};

/**
 * ツモを示す{@link EventItem}です。
 * @interface
 */
export type EventDraw = EventItemBase & {
    /**
     * イベントタイプを指定する文字列です。ツモには`"t"`を指定します。
     */
    readonly k: "t";

    /**
     * どの牌をツモしたのかを示す数値です。
     */
    readonly t: number;
};

type EventMeldBase = EventItemBase & {
    readonly k: "c" | "p" | "a" | "m" | "k";
};

/**
 * 小明槓を示す{@link EventItem}です。
 * @interface
 */
export type EventAdditionalKong = EventMeldBase & {
    /**
     * イベントタイプを指定する文字列です。小明槓には`"k"`を指定します。
     */
    readonly k: "k";

    /**
     * どの牌を加えたのかを示す数値です。
     */
    readonly t: number;
};

/**
 * チーを示す{@link EventItem}です。
 * @interface
 */
export type EventChow = EventMeldBase & {
    /**
     * イベントタイプを指定する文字列です。チーには`"c"`を指定します。
     */
    readonly k: "c";

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
};

/**
 * 暗槓を示す{@link EventItem}です。
 * @interface
 */
export type EventConcealedKong = EventMeldBase & {
    /**
     * イベントタイプを指定する文字列です。暗槓には`"a"`を指定します。
     */
    readonly k: "a";

    /**
     * 暗槓を行う4牌を示す数値の配列です。
     */
    readonly tiles: readonly number[];
};

/**
 * 大明槓を示す{@link EventItem}です。
 * @interface
 */
export type EventOpenKong = EventMeldBase & {
    /**
     * イベントタイプを指定する文字列です。大明槓には`"m"`を指定します。
     */
    readonly k: "m";

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
};

/**
 * ポンを示す{@link EventItem}です。
 * @interface
 */
export type EventPung = EventMeldBase & {
    /**
     * イベントタイプを指定する文字列です。ポンには`"m"`を指定します。
     */
    readonly k: "p";

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
};

/** 
 * ツモ、打牌、鳴きなどの各行動を示す抽象タイプです。
 * 
 * 具体的には以下のいずれかを示します。
 * 
 * - EventAdditionalKong
 * - EventChow
 * - EventConcealedKong
 * - EventDiscard
 * - EventDraw
 * - EventOpenKong
 * - EventPung
 * 
 * 共通プロパティ`k`によってどの種別なのかを判断できます。
 */
export type EventItem = EventAdditionalKong | EventChow | EventConcealedKong | EventOpenKong | EventPung | EventDiscard | EventDraw;
