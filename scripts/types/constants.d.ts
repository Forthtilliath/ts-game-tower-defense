declare const _default: Readonly<{
    TILE_DEFAULT_SIZE: string;
    WAVE_DELAI: number;
    MONSTER_DELAI: number;
    LOG_WAVE: boolean;
    TEXTCONTENT_TILE: boolean;
}>;
export default _default;
export declare const EmptyObject: {
    json: {
        player: {
            startGold: number;
            startLife: number;
        };
        maps: {
            nbTiles: {
                x: number;
                y: number;
            };
            tiles: never[];
            waves: number[];
            routes: number[][];
        }[];
        turrets: never[];
        monsters: never[];
        waves: never[];
    };
    map: {
        nbTiles: {
            x: number;
            y: number;
        };
        tiles: number[][];
        waves: number[];
        routes: number[][];
    };
    tiles: number[];
};
export declare const LogStyles: {
    red: string;
};
