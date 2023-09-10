/** Classe représentant une moyenne de session.
 * @class
 */
class AverageSessionEntity {
    /**
     * Crée une instance de AverageSessionEntity.
     * @constructor
     * @param {Object} data - Les données de la session.
     * @param {string} data.day - Le jour de la session.
     * @param {number} data.sessionLength - La durée moyenne de la session en minutes.
     */
    constructor(data) {
        const daysMap = {
            1: 'L',
            2: 'M',
            3: 'M',
            4: 'J',
            5: 'V',
            6: 'S',
            7: 'D',
        }

        this._day = daysMap[data.day]
        this._sessionLength = data.sessionLength
    }

    /**
     * Retourne le jour de la session.
     * @returns {string} Le jour de la session.
     */
    get day() {
        return this._day
    }

    /**
     * Retourne la durée moyenne de session en minutes.
     * @returns {number} La durée de la session en minutes.
     */
    get sessionLength() {
        return this._sessionLength
    }
}

/** Classe représentant une entité de moyennes de sessions.
 * @class
 */
class AverageSessionsEntity {
    /**
     * Crée une instance de AverageSessionsEntity.
     * @constructor
     * @param {Object} data - Les données de l'entité de moyennes de sessions.
     * @param {string} data.userId - L'identifiant de l'utilisateur.
     * @param {Array<AverageSessionEntity>} data.sessions - Les moyennes de sessions.
     */
    constructor(data) {
        this._userId = data.userId
        this._sessions = data.sessions.map((session) => new AverageSessionEntity(session))
    }

    /**
     * Retourne l'identifiant de l'utilisateur.
     * @returns {string} L'identifiant de l'utilisateur.
     */
    get userId() {
        return this._userId
    }

    /**
     * Retourne les moyennes de sessions associées à l'entité de moyennes de sessions.
     * @returns {Array<AverageSessionEntity>} Les moyennes de sessions.
     */
    get sessions() {
        return this._sessions
    }
}

export default AverageSessionsEntity
