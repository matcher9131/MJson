export * from "./types/mJson";
export * from "./types/drawKind";
export * from "./types/eventItem";
export * from "./types/game";
export * from "./types/gameResult";
export * from "./types/playerMatchResult";
export * from "./types/yakuDoubles";
export * from "./types/yaku";
export declare const jsonTypedefSchema: {
    definitions: {
        drawKind: {
            metadata: {
                description: string;
            };
            enum: string[];
        };
        eventItem: {
            additionalProperties: boolean;
            metadata: {
                description: string;
                remarks: string;
                discriminatorDescription: {
                    description: string;
                };
            };
            discriminator: string;
            mapping: {
                d: {
                    additionalProperties: boolean;
                    metadata: {
                        typeName: string;
                        description: string;
                    };
                    properties: {
                        p: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        t: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                    };
                    optionalProperties: {
                        isRiichi: {
                            metadata: {
                                description: string;
                                remarks: string;
                            };
                            type: string;
                        };
                    };
                };
                t: {
                    additionalProperties: boolean;
                    metadata: {
                        typeName: string;
                        description: string;
                    };
                    properties: {
                        p: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        t: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                    };
                };
                c: {
                    additionalProperties: boolean;
                    metadata: {
                        typeName: string;
                        description: string;
                    };
                    properties: {
                        p: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        from: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        t: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        tiles: {
                            metadata: {
                                description: string;
                            };
                            elements: {
                                type: string;
                            };
                        };
                    };
                };
                p: {
                    additionalProperties: boolean;
                    metadata: {
                        typeName: string;
                        description: string;
                    };
                    properties: {
                        p: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        from: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        t: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        tiles: {
                            metadata: {
                                description: string;
                            };
                            elements: {
                                type: string;
                            };
                        };
                    };
                };
                a: {
                    additionalProperties: boolean;
                    metadata: {
                        typeName: string;
                        description: string;
                    };
                    properties: {
                        p: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        tiles: {
                            metadata: {
                                description: string;
                            };
                            elements: {
                                type: string;
                            };
                        };
                    };
                };
                m: {
                    additionalProperties: boolean;
                    metadata: {
                        typeName: string;
                        description: string;
                    };
                    properties: {
                        p: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        from: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        t: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        tiles: {
                            metadata: {
                                description: string;
                            };
                            elements: {
                                type: string;
                            };
                        };
                    };
                };
                k: {
                    additionalProperties: boolean;
                    metadata: {
                        typeName: string;
                        description: string;
                    };
                    properties: {
                        p: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        t: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                    };
                };
            };
        };
        game: {
            additionalProperties: boolean;
            metadata: {
                description: string;
            };
            properties: {
                beginningScores: {
                    metadata: {
                        description: string;
                        remarks: string;
                    };
                    elements: {
                        type: string;
                    };
                };
                round: {
                    metadata: {
                        description: string;
                        remarks: string;
                    };
                    type: string;
                };
                dealerKeepingCount: {
                    metadata: {
                        description: string;
                    };
                    type: string;
                };
                bets: {
                    metadata: {
                        description: string;
                    };
                    type: string;
                };
                dora: {
                    metadata: {
                        description: string;
                        remarks: string;
                    };
                    elements: {
                        type: string;
                    };
                };
                dealtTiles: {
                    metadata: {
                        description: string;
                        remarks: string[];
                    };
                    elements: {
                        elements: {
                            type: string;
                        };
                    };
                };
                events: {
                    metadata: {
                        description: string;
                        remarks: string;
                    };
                    elements: {
                        ref: string;
                    };
                };
                gameResults: {
                    metadata: {
                        description: string;
                        remarks: string[];
                    };
                    elements: {
                        ref: string;
                    };
                };
            };
            optionalProperties: {
                hiddenDora: {
                    metadata: {
                        description: string;
                        remarks: string[];
                    };
                    elements: {
                        type: string;
                    };
                };
            };
        };
        gameResult: {
            additionalProperties: boolean;
            metadata: {
                description: string;
                remarks: string;
                discriminatorDescription: {
                    description: string;
                };
            };
            discriminator: string;
            mapping: {
                win: {
                    additionalProperties: boolean;
                    metadata: {
                        typeName: string;
                        description: string;
                    };
                    properties: {
                        scoreIncrements: {
                            metadata: {
                                description: string;
                                remarks: string[];
                            };
                            elements: {
                                type: string;
                            };
                        };
                        player: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        winScore: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        points: {
                            metadata: {
                                description: string;
                            };
                            type: string;
                        };
                        yakuList: {
                            metadata: {
                                description: string;
                            };
                            elements: {
                                ref: string;
                            };
                        };
                    };
                    optionalProperties: {
                        from: {
                            metadata: {
                                description: string;
                                remarks: string;
                            };
                            type: string;
                        };
                        pao: {
                            metadata: {
                                description: string;
                                remarks: string;
                            };
                            type: string;
                        };
                    };
                };
                draw: {
                    additionalProperties: boolean;
                    metadata: {
                        typeName: string;
                        description: string;
                    };
                    properties: {
                        drawKind: {
                            metadata: {
                                description: string;
                            };
                            ref: string;
                        };
                    };
                };
            };
        };
        playerMatchResult: {
            metadata: {
                description: string;
            };
            properties: {
                name: {
                    metadata: {
                        description: string;
                    };
                    type: string;
                };
                score: {
                    metadata: {
                        description: string;
                    };
                    type: string;
                };
                income: {
                    metadata: {
                        description: string;
                    };
                    type: string;
                };
                rank: {
                    metadata: {
                        description: string;
                        remarks: string;
                    };
                    type: string;
                };
            };
        };
        yakuDoubles: {
            additionalProperties: boolean;
            metadata: {
                description: string;
                typescriptOverride: string;
            };
            properties: {
                doubles: {
                    metadata: {
                        description: string;
                        remarks: string;
                    };
                    type: string;
                };
            };
            optionalProperties: {
                yakuId: {
                    metadata: {
                        description: string;
                        remarks: string;
                    };
                    type: string;
                };
                yaku: {
                    metadata: {
                        description: string;
                        remarks: string;
                    };
                    type: string;
                };
            };
        };
    };
    additionalProperties: boolean;
    metadata: {
        description: string;
    };
    properties: {
        id: {
            metadata: {
                description: string;
                remarks: string;
            };
            type: string;
        };
        players: {
            metadata: {
                description: string;
                remarks: string;
            };
            elements: {
                ref: string;
            };
        };
        games: {
            metadata: {
                description: string;
                remarks: string;
            };
            elements: {
                ref: string;
            };
        };
    };
};
