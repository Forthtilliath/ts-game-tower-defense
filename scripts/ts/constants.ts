export default Object.freeze({
    /** Taille des tuiles par défaut */
    TILE_DEFAULT_SIZE: '50px',
    /** Delai en secondes avant de passer à la vague suivante */
    WAVE_DELAI: 5,
    /** Delai en secondes avant de passer au monstre suivant */
    MONSTER_DELAI: 0.5,

    // === DEV CONSTANTS ===

    /** Affiche ou non les logs liés à la vague */ 
    LOG_WAVE: false,
    /** Affiche ou non l'index de la case */
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
            routes: [[1,3,2]]
        }],
        turrets: [],
        monsters: [],
        waves: []
    },
    map: {
        nbTiles: { x: 2, y: 2 },
        tiles: [
            [0,1],
            [3,2]],
        waves: [0],
        routes: [[1,3,2]]
    },
    tiles: [0,1,3,2]
}

export const LogStyles = {
    red: "color:red;"
}