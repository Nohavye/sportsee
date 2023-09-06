import { dataSetting, ApiSettings } from './apiSettings'
import Entity from './Entities'

export const apiSettings = new ApiSettings('http://localhost:3000', [
    dataSetting({
        name: 'user',
        route: '/user/:userId',
        key: 'data',
        output: Entity.formats.user,
    }),
    dataSetting({
        name: 'activity',
        route: '/user/:userId/activity',
        key: 'data',
        output: Entity.formats.activity,
    }),
    dataSetting({
        name: 'averageSessions',
        route: '/user/:userId/average-sessions',
        key: 'data',
        output: Entity.formats.averageSessions,
    }),
    dataSetting({
        name: 'performance',
        route: '/user/:userId/performance',
        key: 'data',
        output: Entity.formats.performance,
    }),
])
