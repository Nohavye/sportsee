import { setEndpoint, ApiHandler } from './apiHandler'
import Entity from './Entities'

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

export const apiHandler = new ApiHandler('http://localhost:3000', endpoints)
