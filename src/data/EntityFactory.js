// Entities
import ActivityEntity from './Entities/Activity'
import AverageSessionsEntity from './Entities/AverageSessions'
import PerformanceEntity from './Entities/Performance'
import UserEntity from './Entities/User'

export const EntityFormats = Object.freeze({
    activity: Symbol('activity'),
    averageSessions: Symbol('averageSessions'),
    performance: Symbol('performance'),
    user: Symbol('user'),
})

export class EntityFactory {
    constructor(data, entityFormat) {
        switch (entityFormat) {
            case EntityFormats.activity:
                return new ActivityEntity(data)
            case EntityFormats.averageSessions:
                return new AverageSessionsEntity(data)
            case EntityFormats.performance:
                return new PerformanceEntity(data)
            case EntityFormats.user:
                return new UserEntity(data)
            default:
                return data
        }
    }
}
