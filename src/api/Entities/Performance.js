/** Classe représentant une donnée de performance.
 * @class
 */
class PerformanceDataEntity {
    /**
     * Crée une instance de PerformanceDataEntity.
     * @constructor
     * @param {Object} data - Les données de performance.
     * @param {number} data.value - La valeur de la performance.
     * @param {string} kindValue - Le type de performance.
     */
    constructor(data, kindValue) {
        const kindsMap = {
            cardio: 'Cardio',
            energy: 'Energie',
            endurance: 'Endurance',
            strength: 'Force',
            speed: 'Vitesse',
            intensity: 'Intensité',
        }

        this._value = data.value
        this._kind = kindsMap[kindValue]
    }

    /**
     * Retourne la valeur de la performance.
     * @returns {number} La valeur de la performance.
     */
    get value() {
        return this._value
    }

    /**
     * Retourne le type de performance.
     * @returns {string} Le type de performance.
     */
    get kind() {
        return this._kind
    }
}

/** Classe représentant une entité de performance.
 * @class
 */
class PerformanceEntity {
    /**
     * Crée une instance de PerformanceEntity.
     * @constructor
     * @param {Object} data - Les données de l'entité de performance.
     * @param {string} data.userId - L'identifiant de l'utilisateur.
     * @param {Array<Object>} data.data - Les données de performance.
     * @param {Object} data.kind - Les types de performance.
     */
    constructor(data) {
        this._userId = data.userId
        this._data = data.data
            .reverse()
            .map(
                (dataPerformance) =>
                    new PerformanceDataEntity(dataPerformance, data.kind[dataPerformance.kind])
            )
    }

    /**
     * Retourne l'identifiant de l'utilisateur.
     * @returns {string} L'identifiant de l'utilisateur.
     */
    get userId() {
        return this._userId
    }

    /**
     * Retourne les données de performance associées à l'entité de performance.
     * @returns {Array<PerformanceDataEntity>} Les données de performance.
     */
    get data() {
        return this._data
    }
}

export default PerformanceEntity
