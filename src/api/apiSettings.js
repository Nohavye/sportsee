import Entity from './Entities'

export const dataSetting = (name, route, key, output) => {
    return { name, route, key, output }
}

export class ApiSettings {
    constructor(url, dataSettings) {
        this._endpoints = {}

        dataSettings.forEach((setting) => {
            this._endpoints[setting.name] = {
                value: `${url}${setting.route}`,
                key: setting.key,
                output: setting.output,
            }
        })
    }

    _replaceParams(endpointValue, params = {}) {
        let newEndpointValue = endpointValue
        for (const key in params) {
            newEndpointValue = newEndpointValue.replace(`:${key}`, params[key])
        }
        return newEndpointValue
    }

    getEndpoint(name, params = {}) {
        const endpoint = { ...this._endpoints[name] }
        endpoint.value = this._replaceParams(endpoint.value, params)
        console.log(endpoint.value)
        return endpoint
    }

    getEndpointsNames() {
        const endpointsNames = []
        for (const name in this._endpoints) {
            endpointsNames.push(name)
        }
        return endpointsNames
    }
}
