import { dataSetting, ApiSettings } from './apiSettings'
import Entity from './Entities'

export const apiSettings = new ApiSettings('http://localhost:3000', [
    dataSetting('user', '/user/:userId', 'data', Entity.formats.user),
    dataSetting('activity', '/user/:userId/activity', 'data', Entity.formats.activity),
    dataSetting('averageSessions', '/user/:userId/average-sessions', 'data', Entity.formats.averageSessions),
    dataSetting('performance', '/user/:userId/performance', 'data', Entity.formats.performance),
])
