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
    constructor(apiSettings, defaultEndpointArgs = {}) {
        this._apiSettings = apiSettings
        this._defaultEndpointArgs = defaultEndpointArgs
        this._listeners = {
            data: null,
            loading: null,
            error: null,
        }
        this._data = {}
    }

    setDefaultEndpointArgs(args) {
        this._defaultEndpointArgs = args
    }

    attachDataListener(callback) {
        this._listeners.data = callback
    }
    attachLoadingListener(callback) {
        this._listeners.loading = callback
    }
    attachErrorListener(callback) {
        this._listeners.error = callback
    }
    detachListeners() {
        for (const prop in this._listeners) {
            this._listeners[prop] = null
        }
    }

    async _fetchEndpoint(name, mergedEndpointArgs) {
        const endpointsArgs = { ...this._defaultEndpointArgs, ...mergedEndpointArgs }
        const endpoint = this._apiSettings.getEndpoint(name, endpointsArgs)

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

    loadEndpoints(EndpointNames, mergedEndpointArgs = {}) {
        this._listeners.loading(true)

        const promises = []
        EndpointNames.forEach((name) => {
            promises.push(this._fetchEndpoint(name, mergedEndpointArgs))
        })

        Promise.all(promises)
            .then(() => {
                this._listeners.data(this._data)
            })
            .catch((error) => {
                this._listeners.error(true)
                console.error(error)
            })
            .finally(() => {
                this._listeners.loading(false)
            })
    }

    loadAllEndpoints(mergedEndpointsArgs = {}) {
        this._listeners.loading(true)

        const promises = []
        this._apiSettings.getEndpointsNames().forEach((name) => {
            promises.push(this._fetchEndpoint(name, mergedEndpointsArgs))
        })

        Promise.all(promises)
            .then(() => {
                this._listeners.data(this._data)
            })
            .catch((error) => {
                this._listeners.error(true)
                console.error(error)
            })
            .finally(() => {
                this._listeners.loading(false)
            })
    }
}
