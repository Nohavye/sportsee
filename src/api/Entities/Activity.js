/** Classe représentant une session d'activité.
 * @class
 */
class ActivitySessionEntity {
    /**
     * Crée une instance de ActivitySessionEntity.
     * @constructor
     * @param {Object} data - Les données de la session d'activité.
     * @param {string} data.day - Le jour de la session.
     * @param {number} data.kilogram - Le poids en kilogrammes.
     * @param {number} data.calories - Le nombre de calories brûlées.
     */
    constructor(data) {
        this._day = data.day
        this._kilogram = data.kilogram
        this._calories = data.calories
    }

    /**
     * Retourne le jour de la session.
     * @returns {string} Le jour de la session.
     */
    get day() {
        return this._day
    }

    /**
     * Retourne le poids en kilogrammes.
     * @returns {number} Le poids en kilogrammes.
     */
    get kilogram() {
        return this._kilogram
    }

    /**
     * Retourne le nombre de calories.
     * @returns {number} Le nombre de calories.
     */
    get calories() {
        return this._calories
    }
}

/** Classe représentant une entité d'activité.
 * @class
 */
class ActivityEntity {
    /**
     * Crée une instance de ActivityEntity.
     * @constructor
     * @param {Object} data - Les données de l'entité d'activité.
     * @param {string} data.userId - L'identifiant de l'utilisateur.
     * @param {Array<ActivitySessionEntity>} data.sessions - Les sessions d'activité.
     */
    constructor(data) {
        this._userId = data.userId
        this._sessions = data.sessions.map((session) => new ActivitySessionEntity(session))
    }

    /**
     * Retourne l'identifiant de l'utilisateur.
     * @returns {string} L'identifiant de l'utilisateur.
     */
    get userId() {
        return this._userId
    }

    /**
     * Retourne les sessions d'activité associées à l'entité d'activité.
     * @returns {Array<ActivitySessionEntity>} Les sessions d'activité.
     */
    get sessions() {
        return this._sessions
    }
}

export default ActivityEntity
