// Entities
import ActivityEntity from './Activity'
import AverageSessionsEntity from './AverageSessions'
import PerformanceEntity from './Performance'
import UserEntity from './User'

/** Module contenant des fonctions pour créer différentes entités.
 * @namespace
 */
const Entity = {
    /**
     * Crée une nouvelle instance de l'entité d'activité.
     * @function
     * @param {Object} data - Données pour initialiser l'entité.
     * @returns {ActivityEntity} Une nouvelle instance de l'entité d'activité.
     */
    activity: (data) => new ActivityEntity(data),

    /**
     * Crée une nouvelle instance de l'entité de moyennes de sessions.
     * @function
     * @param {Object} data - Données pour initialiser l'entité.
     * @returns {AverageSessionsEntity} Une nouvelle instance de l'entité de moyennes de sessions.
     */
    averageSessions: (data) => new AverageSessionsEntity(data),

    /**
     * Crée une nouvelle instance de l'entité de performance.
     * @function
     * @param {Object} data - Données pour initialiser l'entité.
     * @returns {PerformanceEntity} Une nouvelle instance de l'entité de performance.
     */
    performance: (data) => new PerformanceEntity(data),

    /**
     * Crée une nouvelle instance de l'entité d'utilisateur.
     * @function
     * @param {Object} data - Données pour initialiser l'entité.
     * @returns {UserEntity} Une nouvelle instance de l'entité d'utilisateur.
     */
    user: (data) => new UserEntity(data),
}

export default Entity
