import { setEndpoint, ApiSettings } from './apiSettings'
import Entity from './Entities'

export const endpoints = {
    user: setEndpoint({
        route: '/user/:userId',
        dataField: 'data',
        output: Entity.user,
    }),
    activity: setEndpoint({
        route: '/user/:userId/activity',
        dataField: 'data',
        output: Entity.activity,
    }),
    averageSessions: setEndpoint({
        route: '/user/:userId/average-sessions',
        dataField: 'data',
        output: Entity.averageSessions,
    }),
    performance: setEndpoint({
        route: '/user/:userId/performance',
        dataField: 'data',
        output: Entity.performance,
    }),
}

export const apiSettings = new ApiSettings('http://localhost:3000', endpoints)
