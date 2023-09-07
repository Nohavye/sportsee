/**
 * Module représentant une fabrique d'entités.
 * @module Entity
 */

import { EntityFactory, EntityFormats } from './EntityFactory'

/**
 * Objet `Entity` qui expose les formats d'entités disponibles et une fonction de création d'entités.
 * @namespace
 */
const Entity = {
    /**
     * Formats d'entités disponibles.
     * @type {Object}
     * @property {symbol} activity - Format pour les entités d'activité.
     * @property {symbol} averageSessions - Format pour les entités de moyennes de sessions.
     * @property {symbol} performance - Format pour les entités de performances.
     * @property {symbol} user - Format pour les entités d'utilisateur.
     */
    formats: EntityFormats,

    /**
     * Crée une instance d'entité en utilisant la fabrique d'entités.
     * @function
     * @param {Object} data - Les données à utiliser pour créer une entité.
     * @param {Symbol} entityFormat - Le format d'entité souhaité.
     * @returns {ActivityEntity|AverageSessionsEntity|PerformanceEntity|UserEntity|Object} Une instance d'entité ou les données d'origine si le format n'est pas reconnu.
     */
    create: (data, entityFormat) => {
        return new EntityFactory(data, entityFormat)
    },
}

export default Entity
