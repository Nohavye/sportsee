export const setEndpoint = ({ name, route, dataField, output }) => {
    return { route, dataField, output }
}

export class ApiSettings {
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
