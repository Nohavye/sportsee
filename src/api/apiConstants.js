import { endpointSetting, ApiSettings } from './apiSettings'
import { EntityFormats } from './Entities/EntityFactory'

/**
 * Configuration des paramètres de l'API.
 * @type {ApiSettings}
 */
export const apiSettings = new ApiSettings('http://localhost:3000', [
    endpointSetting({
        name: 'user',
        route: '/user/:userId',
        dataField: 'data',
        output: EntityFormats.user,
    }),
    endpointSetting({
        name: 'activity',
        route: '/user/:userId/activity',
        dataField: 'data',
        output: EntityFormats.activity,
    }),
    endpointSetting({
        name: 'averageSessions',
        route: '/user/:userId/average-sessions',
        dataField: 'data',
        output: EntityFormats.averageSessions,
    }),
    endpointSetting({
        name: 'performance',
        route: '/user/:userId/performance',
        dataField: 'data',
        output: EntityFormats.performance,
    }),
])
