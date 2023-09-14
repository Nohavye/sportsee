import { setEndpoint, ApiHandler } from '../api/apiHandler'
import Entity from '../api/Entities'

const useMockApi = true

const apiUrl = {
    default: 'http://localhost:3000',
    mocked: 'http://localhost:3330',
}

const getApiUrl = () => (useMockApi ? apiUrl.mocked : apiUrl.default)

/** Paramètres des endpoints de l'API. */
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
ApiHandler.set(getApiUrl(), endpoints)
