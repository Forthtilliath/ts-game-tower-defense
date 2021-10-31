export declare const $: (selector: string) => Element | null;
export declare const compareArrays: (array1: any[], array2: any[]) => boolean;
export declare const appendChilds: (parent: HTMLElement, elements: HTMLElement[]) => void;
export declare const loadJson: (url: string) => Promise<any>;
export declare const mergeArrays: (arr: any[][]) => any[];
export declare const getContentById: (id: number, arrayOfContents: any[]) => any;
export declare const getContentByIds: (array: number[], arrayOfContents: any[]) => any[];
export declare const trajCalculation: (bulletX: number, bulletY: number, targetX: number, targetY: number) => {
    x: number;
    y: number;
    travelDistance: number;
};
export declare const distCalculation: (deltaX: number, deltaY: number) => number;
declare const _default: {
    compareArrays: (array1: any[], array2: any[]) => boolean;
    appendChilds: (parent: HTMLElement, elements: HTMLElement[]) => void;
    loadJson: (url: string) => Promise<any>;
    mergeArrays: (arr: any[][]) => any[];
    getContentById: (id: number, arrayOfContents: any[]) => any;
    getContentByIds: (array: number[], arrayOfContents: any[]) => any[];
    trajCalculation: (bulletX: number, bulletY: number, targetX: number, targetY: number) => {
        x: number;
        y: number;
        travelDistance: number;
    };
};
export default _default;
