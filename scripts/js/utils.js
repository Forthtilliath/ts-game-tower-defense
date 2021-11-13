export const $ = (selector) => document.querySelector(selector);
export const appendChilds = (parent, elements) => elements.forEach((element) => parent.appendChild(element));
export const getContentById = (id, arrayOfContents) => arrayOfContents.find((content) => content.id === id) ?? [];
export const getContentByIds = (array, arrayOfContents) => array.flatMap((id) => getContentById(id, arrayOfContents));
export function piz(n) {
    return n;
}
export function pi(n) {
    return n;
}
export default {
    appendChilds,
    getContentById,
    getContentByIds,
};
