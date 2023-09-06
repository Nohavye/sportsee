class PerformanceDataEntity {
    constructor(data, kindValue) {
        this._value = data.value
        this._kind = kindValue
    }

    get value() {
        return this._value
    }
    get kind() {
        return this._kind
    }
}

class PerformanceEntity {
    constructor(data) {
        this._userId = data.userId
        this._data = data.data.map(
            (dataPerformance) =>
                new PerformanceDataEntity(dataPerformance, data.kind[dataPerformance.kind])
        )
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

export default PerformanceEntity
