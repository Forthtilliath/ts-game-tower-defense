export const $ = (selector) => document.querySelector(selector);
export const compareArrays = (array1, array2) => JSON.stringify(array1) === JSON.stringify(array2);
export const appendChilds = (parent, elements) => elements.forEach((element) => parent.appendChild(element));
export const loadJson = async (url) => {
    try {
        return await fetch(url).then(res => res.json());
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
export const mergeArrays = (arr) => arr.reduce((accArr, currArr) => accArr.concat(...currArr), []);
export const getContentById = (id, arrayOfContents) => arrayOfContents.find((content) => content.id === id) ?? [];
export const getContentByIds = (array, arrayOfContents) => array.flatMap((id) => getContentById(id, arrayOfContents));
export const trajCalculation = (bulletX, bulletY, targetX, targetY) => {
    let x = targetX - bulletX;
    let y = targetY - bulletY;
    let travelDistance = distCalculation(x, y);
    x /= travelDistance;
    y /= travelDistance;
    return { x, y, travelDistance };
};
export const distCalculation = (deltaX, deltaY) => Math.sqrt(deltaX * deltaX + deltaY * deltaY);
export default {
    compareArrays,
    appendChilds,
    loadJson,
    mergeArrays,
    getContentById,
    getContentByIds,
    trajCalculation,
};
