/**
 * 役と飜数を示します。
 *
 * @interface
 */
export type YakuDoubles =
    | {
          /**
           * 役のIDを示す数値です。`types/yaku.ts`に対応します。
           *
           * @remarks
           * このプロパティかyakuのいずれかを指定する必要があります。
           */
          readonly yakuId: number;

          /**
           * 飜数を示す数値です。
           *
           * @remarks
           * 役満には13、ダブル役満には26を指定します。
           */
          readonly doubles: number;
      }
    | {
          /**
           * 役名を示す文字列です。
           *
           * @remarks
           * このプロパティかyakuIdのいずれかを指定する必要があります。
           */
          readonly yaku: string;

          /**
           * 飜数を示す数値です。
           *
           * @remarks
           * 役満には13、ダブル役満には26を指定します。
           */
          readonly doubles: number;
      };
