import { setEndpoint, ApiHandler } from './apiHandler'
import Entity from './Entities'

/**
 * Paramètres de endpoint.
 * @typedef {Object} EndpointSettings
 * @property {string} route - Le chemin du endpoint.
 * @property {string} field - Le champ de données du endpoint.
 * @property {function} output - La fonction à appliquer sur les données sortantes.
 */
/**
 * Paramètres de endpoint avec le nom.
 * @typedef {Object} Endpoint
 * @property {string} name - Le nom du endpoint.
 * @property {string} route - Le chemin du endpoint.
 * @property {string} field - Le champ de données du endpoint.
 * @property {function} output - La fonction à appliquer sur les données sortantes.
 */

/** Paramètres des endpoints de l'API.
 * @type {(Object.<string, EndpointSettings>|Object.<string, Endpoint>)}
 */
export const endpoints = {
    user: setEndpoint({
        route: '/user/:userId',
        field: 'data',
        output: Entity.user,
    }),
    activity: setEndpoint({
        route: '/user/:userId/activity',
        field: 'data',
        output: Entity.activity,
    }),
    averageSessions: setEndpoint({
        route: '/user/:userId/average-sessions',
        field: 'data',
        output: Entity.averageSessions,
    }),
    performance: setEndpoint({
        route: '/user/:userId/performance',
        field: 'data',
        output: Entity.performance,
    }),
}

/** Gestionnaire de l'API. */
export const apiHandler = new ApiHandler('http://localhost:3000', endpoints)
