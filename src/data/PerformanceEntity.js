class PerformanceData_Entity {
    constructor(data) {
        this._value = data.value
        this._kind = data.kind
    }

    get value() {
        return this._value
    }
    get kind() {
        return this._kind
    }
}

class Performance_Entity {
    constructor(data) {
        this._userId = data.userId
        this._kind = data.kind
        this._data = data.data.map((d) => new PerformanceData_Entity(d))
    }

    get userId() {
        return this._userId
    }
    get kind() {
        return this._kind
    }
    get data() {
        return this._data
    }
}

export default Performance_Entity
