export declare const $: (selector: string) => HTMLElement;
export declare const compareArrays: (array1: any[], array2: any[]) => boolean;
export declare const appendChilds: (parent: HTMLElement, elements: HTMLElement[]) => void;
export declare const mergeArrays: (arr: any[][]) => any[];
export declare const getContentById: (id: number, arrayOfContents: any[]) => any;
export declare const getContentByIds: (array: number[], arrayOfContents: any[]) => any[];
export declare const trajCalculation: (bulletX: number, bulletY: number, targetX: number, targetY: number) => {
    x: number;
    y: number;
    travelDistance: number;
};
export declare const distCalculation: (deltaX: number, deltaY: number) => number;
export declare const launchEvent: (eventName: string, detail: object) => void;
declare const _default: {
    compareArrays: (array1: any[], array2: any[]) => boolean;
    appendChilds: (parent: HTMLElement, elements: HTMLElement[]) => void;
    mergeArrays: (arr: any[][]) => any[];
    getContentById: (id: number, arrayOfContents: any[]) => any;
    getContentByIds: (array: number[], arrayOfContents: any[]) => any[];
    trajCalculation: (bulletX: number, bulletY: number, targetX: number, targetY: number) => {
        x: number;
        y: number;
        travelDistance: number;
    };
    launchEvent: (eventName: string, detail: object) => void;
};
export default _default;
