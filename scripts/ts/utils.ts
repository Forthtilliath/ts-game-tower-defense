/** Retourne un élément HTML à partir du sélecteur */
export const $ = (selector: string) => document.querySelector(selector) as HTMLElement;

/** Ajoute des éléments dans le DOM */
export const appendChilds = (parent: HTMLElement, elements: HTMLElement[]) =>
    elements.forEach((element) => parent.appendChild(element));

/** Récupère un élément parmi un tableau à partir de son id */
export const getContentById = (id: number, arrayOfContents: any[]): any =>
    arrayOfContents.find((content) => content.id === id) ?? [];

/** Récupère des éléments parmi un tableau à partir de leur id */
export const getContentByIds = (array: number[], arrayOfContents: any[]): any[] =>
    array.flatMap((id: number): Object => getContentById(id, arrayOfContents));

/** Retourne un nombre entier positif, nombre **supérieur ou égal** à 0 */
export function piz<N extends number>(n: PositiveInteger<N> | Zero<N>): number {
    return n;
}
/** Retourne un nombre entier positif, nombre **strictement supérieur** à 0 */
export function pi<N extends number>(n: PositiveInteger<N>): number {
    return n;
}

export default {
    appendChilds,
    getContentById,
    getContentByIds,
};