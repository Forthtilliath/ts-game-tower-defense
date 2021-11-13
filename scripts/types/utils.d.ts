export declare const $: (selector: string) => HTMLElement;
export declare const appendChilds: (parent: HTMLElement, elements: HTMLElement[]) => void;
export declare const getContentById: (id: number, arrayOfContents: any[]) => any;
export declare const getContentByIds: (array: number[], arrayOfContents: any[]) => any[];
export declare function piz<N extends number>(n: PositiveInteger<N> | Zero<N>): number;
export declare function pi<N extends number>(n: PositiveInteger<N>): number;
declare const _default: {
    appendChilds: (parent: HTMLElement, elements: HTMLElement[]) => void;
    getContentById: (id: number, arrayOfContents: any[]) => any;
    getContentByIds: (array: number[], arrayOfContents: any[]) => any[];
};
export default _default;
