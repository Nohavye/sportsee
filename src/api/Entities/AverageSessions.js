class AverageSessionEntity {
    constructor(data) {
        this._day = data.day
        this._sessionLength = data.sessionLength
    }

    get day() {
        return this._day
    }
    get sessionLength() {
        return this._sessionLength
    }
}

class AverageSessionsEntity {
    constructor(data) {
        this._userId = data.userId
        this._sessions = data.sessions.map(
            (session) => new AverageSessionEntity(session)
        )
    }

    get userId() {
        return this._userId
    }
    get sessions() {
        return this._sessions
    }
}

export default AverageSessionsEntity
