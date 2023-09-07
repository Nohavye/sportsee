export const dataSetting = ({ name, route, key, output }) => {
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
        return endpoint
    }

    getEndpointsNames() {
        return Object.keys(this._endpoints)
    }
}
