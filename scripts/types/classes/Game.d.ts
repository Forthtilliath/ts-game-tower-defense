declare class Game {
    private currentMap;
    private datas;
    private isPlaying;
    private timestamp;
    private animFrameId;
    private constructor();
    static CreateAsync: () => Promise<Game>;
    loadMap(mapId: number): void;
    play(): void;
    stop(): void;
    updateStates(): void;
    update(): void;
}
declare const _default: Promise<Game>;
export default _default;
