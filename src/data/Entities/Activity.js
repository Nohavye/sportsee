class ActivitySessionEntity {
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

class ActivityEntity {
    constructor(data) {
        this._userId = data.userId
        this._sessions = data.sessions.map(
            (session) => new ActivitySessionEntity(session)
        )
    }

    get userId() {
        return this._userId
    }
    get sessions() {
        return this._sessions
    }
}

export default ActivityEntity
