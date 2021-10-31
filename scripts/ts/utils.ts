/**
 * Retourne un élément HTML à partir du sélecteur
 * @returns {HTMLElement}
 */
export const $ = (selector: string) => document.querySelector(selector);

/**
 * Compare 2 tableaux pour savoir s'ils sont identiques.
 * Note : Le type et l'ordre des valeurs est important, sinon les tableaux ne seront pas egaux !
 */
export const compareArrays = (array1: any[], array2: any[]) => JSON.stringify(array1) === JSON.stringify(array2);

/**
 * Ajoute des éléments dans le DOM
 */
export const appendChilds = (parent: HTMLElement, elements: HTMLElement[]) =>
    elements.forEach((element) => parent.appendChild(element));

/**
 * Charge un fichier JSON à partir d'une url
 */
export const loadJson = async (url: string) => {
    try {
        const res = await fetch(url); // Fetch du JSON
        return await res.json(); // Returne des données en JSON
    } catch (err) {
        console.error(err); // Log les erreurs dans la console
    }
}; 

/**
 * Fusionne un tableau à 2 dimensions pour retourner un tableau à une dimension
 */
export const mergeArrays = (arr: any[][]) => arr.reduce((accArr, currArr) => accArr.concat(...currArr), []);

/**
 * Récupère un élément parmi un tableau à partir de son id
 */
export const getContentById = (id: number, arrayOfContents: any[]): any =>
    arrayOfContents.find((content) => content.id === id) ?? [];

/**
 * Récupère des éléments parmi un tableau à partir de leur id
 */
export const getContentByIds = (array: number[], arrayOfContents: any[]): any[] =>
    array.flatMap((id: number): Object => getContentById(id, arrayOfContents));

// export const getContentByObjectsWithId = (arrayOfObjects, arrayOfContents, propertyName) =>
//     arrayOfObjects.map((object) => getContentById(object[propertyName], arrayOfContents));

/**
 * Calcul des distances entre projectile et cible
 * @returns {object} distance de la cible en x et en y et distance total de trajet
 */
export const trajCalculation = (
    bulletX: number,
    bulletY: number,
    targetX: number,
    targetY: number,
): { x: number; y: number; travelDistance: number } => {
    let x = targetX - bulletX;
    let y = targetY - bulletY;

    let travelDistance = distCalculation(x, y);

    x /= travelDistance;
    y /= travelDistance;

    return { x, y, travelDistance };
};

/**
 * Calcul de la distance en ligne droite entre 2 points
 * @returns {number} distance de trajet entre les deux points
 */
export const distCalculation = (deltaX: number, deltaY: number): number => Math.sqrt(deltaX * deltaX + deltaY * deltaY);

export default {
    compareArrays,
    appendChilds,
    loadJson,
    mergeArrays,
    getContentById,
    getContentByIds,
    trajCalculation,
};
