import { setEndpoint, ApiSettings } from './apiSettings'
import { EntityFormats } from './Entities/EntityFactory'

export const endpoints = {
    user: setEndpoint({
        route: '/user/:userId',
        dataField: 'data',
        output: EntityFormats.user,
    }),
    activity: setEndpoint({
        route: '/user/:userId/activity',
        dataField: 'data',
        output: EntityFormats.activity,
    }),
    averageSessions: setEndpoint({
        route: '/user/:userId/average-sessions',
        dataField: 'data',
        output: EntityFormats.averageSessions,
    }),
    performance: setEndpoint({
        route: '/user/:userId/performance',
        dataField: 'data',
        output: EntityFormats.performance,
    }),
}

export const apiSettings = new ApiSettings('http://localhost:3000', endpoints)
