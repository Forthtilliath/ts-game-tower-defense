/** Retourne un élément HTML à partir du sélecteur */
export declare const $: (selector: string) => HTMLElement;
/** Ajoute des éléments dans le DOM */
export declare const appendChilds: (parent: HTMLElement, elements: HTMLElement[]) => void;
/** Récupère un élément parmi un tableau à partir de son id */
export declare const getContentById: (id: number, arrayOfContents: any[]) => any;
/** Récupère des éléments parmi un tableau à partir de leur id */
export declare const getContentByIds: (array: number[], arrayOfContents: any[]) => any[];
/** Retourne un nombre entier positif, nombre **supérieur ou égal** à 0 */
export declare function piz<N extends number>(n: PositiveInteger<N> | Zero<N>): number;
/** Retourne un nombre entier positif, nombre **strictement supérieur** à 0 */
export declare function pi<N extends number>(n: PositiveInteger<N>): number;
declare const _default: {
    appendChilds: (parent: HTMLElement, elements: HTMLElement[]) => void;
    getContentById: (id: number, arrayOfContents: any[]) => any;
    getContentByIds: (array: number[], arrayOfContents: any[]) => any[];
};
export default _default;
