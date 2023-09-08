/**
 * Module représentant une fabrique d'entités.
 * @module Entity
 */

// Entities
import ActivityEntity from './Activity'
import AverageSessionsEntity from './AverageSessions'
import PerformanceEntity from './Performance'
import UserEntity from './User'

/**
 * Objet `Entity` qui expose les formats d'entités disponibles.
 * @namespace
 */
const Entity = {
    activity: (data) => new ActivityEntity(data),
    averageSessions: (data) => new AverageSessionsEntity(data),
    performance: (data) => new PerformanceEntity(data),
    user: (data) => new UserEntity(data),
}

export default Entity
