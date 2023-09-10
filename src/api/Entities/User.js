/** Classe représentant les informations de l'utilisateur.
 * @class
 */
class UserInfosEntity {
    /**
     * Crée une instance de UserInfosEntity.
     * @constructor
     * @param {Object} data - Les données des informations de l'utilisateur.
     * @param {string} data.firstName - Le prénom de l'utilisateur.
     * @param {string} data.lastName - Le nom de l'utilisateur.
     * @param {number} data.age - L'âge de l'utilisateur.
     */
    constructor(data) {
        this._firstName = data.firstName
        this._lastName = data.lastName
        this._age = data.age
    }

    /**
     * Retourne le prénom de l'utilisateur.
     * @returns {string} Le prénom de l'utilisateur.
     */
    get firstName() {
        return this._firstName
    }

    /**
     * Retourne le nom de l'utilisateur.
     * @returns {string} Le nom de l'utilisateur.
     */
    get lastName() {
        return this._lastName
    }

    /**
     * Retourne l'âge de l'utilisateur.
     * @returns {number} L'âge de l'utilisateur.
     */
    get age() {
        return this._age
    }
}

/** Classe représentant les données clés de l'utilisateur.
 * @class
 */
class UserKeyDataEntity {
    /**
     * Crée une instance de UserKeyDataEntity.
     * @constructor
     * @param {Object} data - Les données des données clés de l'utilisateur.
     * @param {number} data.calorieCount - Le nombre de calories.
     * @param {number} data.proteinCount - Le nombre de protéines.
     * @param {number} data.carbohydrateCount - Le nombre de glucides.
     * @param {number} data.lipidCount - Le nombre de lipides.
     */
    constructor(data) {
        this._calorieCount = data.calorieCount
        this._proteinCount = data.proteinCount
        this._carbohydrateCount = data.carbohydrateCount
        this._lipidCount = data.lipidCount
    }

    /**
     * Retourne le nombre de calories.
     * @returns {number} Le nombre de calories.
     */
    get calorieCount() {
        return this._calorieCount
    }

    /**
     * Retourne le nombre de protéines.
     * @returns {number} Le nombre de protéines.
     */
    get proteinCount() {
        return this._proteinCount
    }

    /**
     * Retourne le nombre de glucides.
     * @returns {number} Le nombre de glucides.
     */
    get carbohydrateCount() {
        return this._carbohydrateCount
    }

    /**
     * Retourne le nombre de lipides.
     * @returns {number} Le nombre de lipides.
     */
    get lipidCount() {
        return this._lipidCount
    }
}

/** Classe représentant l'entité utilisateur.
 * @class
 */
class UserEntity {
    /**
     * Crée une instance de UserEntity.
     * @constructor
     * @param {Object} data - Les données de l'entité utilisateur.
     * @param {string} data.id - L'identifiant de l'utilisateur.
     * @param {Object} data.userInfos - Les informations de l'utilisateur.
     * @param {number} [data.score] - Le score de l'utilisateur.
     * @param {number} [data.todayScore] - Le score de l'utilisateur.
     * @param {Object} data.keyData - Les données clés de l'utilisateur.
     */
    constructor(data) {
        this._id = data.id
        this._userInfos = new UserInfosEntity(data.userInfos)

        this._score = ((scoreValue = data.score || data.todayScore) => [
            { value: 100 - scoreValue * 100 },
            { value: scoreValue * 100 },
        ])()

        this._keyData = new UserKeyDataEntity(data.keyData)
    }

    /**
     * Retourne l'identifiant de l'utilisateur.
     * @returns {string} L'identifiant de l'utilisateur.
     */
    get id() {
        return this._id
    }

    /**
     * Retourne les informations de l'utilisateur.
     * @returns {UserInfosEntity} Les informations de l'utilisateur.
     */
    get userInfos() {
        return this._userInfos
    }

    /**
     * Retourne le score de l'utilisateur.
     * @returns {Array<{value: number}>} Le score de l'utilisateur.
     */
    get score() {
        return this._score
    }

    /**
     * Retourne les données clés de l'utilisateur.
     * @returns {UserKeyDataEntity} Les données clés de l'utilisateur.
     */
    get keyData() {
        return this._keyData
    }
}

export default UserEntity
