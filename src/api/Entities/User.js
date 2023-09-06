class UserInfosEntity {
    constructor(data) {
        this._firstName = data.firstName
        this._lastName = data.lastName
        this._age = data.age
    }

    get firstName() {
        return this._firstName
    }
    get lastName() {
        return this._lastName
    }
    get age() {
        return this._age
    }
}

class UserKeyDataEntity {
    constructor(data) {
        this._calorieCount = data.calorieCount
        this._proteinCount = data.proteinCount
        this._carbohydrateCount = data.carbohydrateCount
        this._lipidCount = data.lipidCount
    }

    get calorieCount() {
        return this._calorieCount
    }
    get proteinCount() {
        return this._proteinCount
    }
    get carbohydrateCount() {
        return this._carbohydrateCount
    }
    get lipidCount() {
        return this._lipidCount
    }
}

class UserEntity {
    constructor(data) {
        this._id = data.id
        this._userInfos = new UserInfosEntity(data.userInfos)
        if (data.score) {
            this._score = [{ value: 100 - data.score * 100 }, { value: data.score * 100 }]
        } else if (data.todayScore) {
            this._score = [{ value: 100 - data.todayScore * 100 }, { value: data.todayScore * 100 }]
        }
        this._keyData = new UserKeyDataEntity(data.keyData)
    }

    get id() {
        return this._id
    }
    get userInfos() {
        return this._userInfos
    }
    get score() {
        return this._score
    }
    get keyData() {
        return this._keyData
    }
}

export default UserEntity
