export default Object.freeze({
    TILE_DEFAULT_SIZE: '50px',
    WAVE_DELAI: 5,
    MONSTER_DELAI: 0.5,
    LOG_WAVE: false,
    TEXTCONTENT_TILE: false
});
export const EmptyObject = {
    json: {
        player: {
            startGold: 0,
            startLife: 1
        },
        maps: [{
                nbTiles: { x: 2, y: 2 },
                tiles: [],
                waves: [0],
                routes: [[1, 3, 2]]
            }],
        turrets: [],
        monsters: [],
        waves: []
    },
    map: {
        nbTiles: { x: 2, y: 2 },
        tiles: [
            [0, 1],
            [3, 2]
        ],
        waves: [0],
        routes: [[1, 3, 2]]
    },
    tiles: [0, 1, 3, 2]
};
export const LogStyles = {
    red: "color:red;"
};
