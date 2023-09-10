/** Compare récursivement deux objets pour vérifier s'ils sont égaux.
 * @param {Object} firstObject - Le premier objet à comparer.
 * @param {Object} secondObject - Le second objet à comparer.
 * @returns {boolean} True si les objets sont égaux, sinon false.
 */
export function deepEqual(firstObject, secondObject) {
    function isObject(object) {
        return object != null && typeof object === 'object'
    }

    const firstKeys = Object.keys(firstObject)
    const secondKeys = Object.keys(secondObject)

    if (firstKeys.length !== secondKeys.length) {
        return false
    }

    for (const key of firstKeys) {
        const firstValue = firstObject[key]
        const secondValue = secondObject[key]
        const areObjects = isObject(firstValue) && isObject(secondValue)
        if (
            (areObjects && !deepEqual(firstValue, secondValue)) ||
            (!areObjects && firstValue !== secondValue)
        ) {
            return false
        }
    }

    return true
}
