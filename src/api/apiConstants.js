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

const setEndpoint = ({ name, route, dataField, output }) => {
    return { route, dataField, output }
}

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

export class Api {
    constructor(url, endpoints) {
        this._url = url

        for (const prop in endpoints) {
            endpoints[prop] = { ...endpoints[prop], name: prop }
        }
    }

    getEndpoint(endpoint, endpointArgs = {}) {
        const { name, route, dataField, output } = endpoint

        const replaceArgs = (route, endpointArgs) => {
            return Object.keys(endpointArgs).reduce((newRoute, arg) => {
                return newRoute.replace(`:${arg}`, endpointArgs[arg])
            }, route)
        }

        return {
            name,
            value: `${this._url}${replaceArgs(route, endpointArgs)}`,
            dataField,
            output,
        }
    }
}
