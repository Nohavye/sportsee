class AverageSession_Entity {
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

class AverageSessions_Entity {
    constructor(data) {
        this._userId = data.userId
        this._sessions = data.sessions.map(
            (session) => new AverageSession_Entity(session)
        )
    }

    get userId() {
        return this._userId
    }
    get sessions() {
        return this._sessions
    }
}

export default AverageSessions_Entity
