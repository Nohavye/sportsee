// Entities
import ActivityEntity from './Activity'
import AverageSessionsEntity from './AverageSessions'
import PerformanceEntity from './Performance'
import UserEntity from './User'

/**
 * Formats d'entités disponibles.
 * @enum {symbol}
 * @property {symbol} activity - Format pour les entités d'activité.
 * @property {symbol} averageSessions - Format pour les entités de moyennes de sessions.
 * @property {symbol} performance - Format pour les entités de performances.
 * @property {symbol} user - Format pour les entités d'utilisateur.
 */
export const EntityFormats = Object.freeze({
    activity: Symbol('activity'),
    averageSessions: Symbol('averageSessions'),
    performance: Symbol('performance'),
    user: Symbol('user'),
})

/**
 * Classe représentant une fabrique d'entités.
 * @class
 */
export class EntityFactory {
    /**
     * Crée une instance de EntityFactory.
     * @constructor
     * @param {Object} data - Les données à utiliser pour créer une entité.
     * @param {Symbol} entityFormat - Le format d'entité souhaité.
     * @returns {ActivityEntity|AverageSessionsEntity|PerformanceEntity|UserEntity|Object} Une instance d'entité ou les données d'origine si le format n'est pas reconnu.
     */
    constructor(data, entityFormat) {
        this._entityMappings = {
            [EntityFormats.activity]: ActivityEntity,
            [EntityFormats.averageSessions]: AverageSessionsEntity,
            [EntityFormats.performance]: PerformanceEntity,
            [EntityFormats.user]: UserEntity,
        }

        const EntityClass = this._entityMappings[entityFormat]
        return EntityClass ? new EntityClass(data) : data
    }
}
