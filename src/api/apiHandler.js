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

export class ApiHandler {
    constructor(apiSettings) {
        this._apiSettings = apiSettings
        this._listeners = {
            data: null,
            loading: null,
            error: null,
        }
        this._data = {}
    }

    addDataListener(callback) {
        this._listeners.data = callback
    }
    addLoadingListener(callback) {
        this._listeners.loading = callback
    }
    addErrorListener(callback) {
        this._listeners.error = callback
    }
    removeListeners() {
        for (const prop in this._listeners) {
            this._listeners[prop] = null
        }
    }

    async _fetchEndpoint(name, params) {
        const endpoint = this._apiSettings.getEndpoint(name, params)

        try {
            const response = await fetch(endpoint.value)
            if (response.ok) {
                const jsonData = await response.json()
                const keyData = endpoint.key ? jsonData[endpoint.key] : jsonData
                const formatedData = endpoint.outputEntity ? Entity.create(keyData, endpoint.output) : keyData
                this._data[name] = formatedData
            } else {
                throw new Error(`${response.status} (${response.statusText}) on the request ${response.url}`)
            }
        } catch (error) {
            throw error
        }
    }

    loadEndpoints(params) {
        this._listeners.loading(true)

        const promises = []
        this._apiSettings.getEndpointsNames().forEach((name) => {
            promises.push(this._fetchEndpoint(name, params))
        })

        Promise.all(promises)
            .then((data) => {
                this._listeners.data(this._data)
            })
            .catch((error) => {
                this._listeners.error(true)
            })
            .finally(() => {
                this._listeners.loading(false)
            })
    }
}
