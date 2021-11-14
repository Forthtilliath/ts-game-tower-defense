/** Retourne un élément HTML à partir du sélecteur */
export const $ = (selector) => document.querySelector(selector);
/** Ajoute des éléments dans le DOM */
export const appendChilds = (parent, elements) => elements.forEach((element) => parent.appendChild(element));
/** Récupère un élément parmi un tableau à partir de son id */
export const getContentById = (id, arrayOfContents) => arrayOfContents.find((content) => content.id === id) ?? [];
/** Récupère des éléments parmi un tableau à partir de leur id */
export const getContentByIds = (array, arrayOfContents) => array.flatMap((id) => getContentById(id, arrayOfContents));
/** Retourne un nombre entier positif, nombre **supérieur ou égal** à 0 */
export function piz(n) {
    return n;
}
/** Retourne un nombre entier positif, nombre **strictement supérieur** à 0 */
export function pi(n) {
    return n;
}
export default {
    appendChilds,
    getContentById,
    getContentByIds,
};
