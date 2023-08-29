class ActivitySession_Entity {
    constructor(data) {
        this._day = data.day
        this._kilogram = data.kilogram
        this._calories = data.calories
    }

    get day() {
        return this._day
    }
    get kilogram() {
        return this._kilogram
    }
    get calories() {
        return this._calories
    }
}

class Activity_Entity {
    constructor(data) {
        this._userId = data.userId
        this._sessions = data.sessions.map(
            (session) => new ActivitySession_Entity(session)
        )
    }

    get userId() {
        return this._userId
    }
    get sessions() {
        return this._sessions
    }
}

export default Activity_Entity
