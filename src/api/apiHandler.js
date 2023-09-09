/**
 * Paramètres de endpoint.
 * @typedef {Object} EndpointSettings
 * @property {string} route - Le chemin du endpoint.
 * @property {string} field - Le champ de données du endpoint.
 * @property {function} output - La fonction à appliquer sur les données sortantes.
 */
/**
 * Paramètres de endpoint avec le nom.
 * @typedef {Object} Endpoint
 * @property {string} name - Le nom du endpoint.
 * @property {string} route - Le chemin du endpoint.
 * @property {string} field - Le champ de données du endpoint.
 * @property {function} output - La fonction à appliquer sur les données sortantes.
 */
/**
 * Paramètres de endpoint avec le nom.
 * @typedef {Object} ProprocessedEndpoint
 * @property {string} name - Le nom du endpoint.
 * @property {string} value - L'URL complète du endpoint avec les arguments.
 * @property {string} field - Le champ de données du endpoint.
 * @property {function} output - La fonction à appliquer sur les données sortantes.
 */
/**
 * Fonction pour paramétrer un endpoint.
 * @function
 * @param {Object} params - Paramètres du endpoint.
 * @param {string} params.route - Le chemin du endpoint.
 * @param {string} params.field - Le champ de données du endpoint.
 * @param {function} params.output - La fonction à appliquer sur les données sortantes.
 * @returns {EndpointSettings} Paramètres de endpoint.
 */
export const setEndpoint = ({ route, field, output }) => {
    return { route, field, output }
}

/**
 * Classe pour gérer les paramètres de l'API.
 * @class
 */
export class ApiHandler {
    /**
     * Crée une nouvelle instance de ApiHandler.
     * @constructor
     * @param {string} url - L'URL de base de l'API.
     * @param {Object.<string, EndpointSettings>} endpoints - Paramètres des endpoints.
     */
    constructor(url, endpoints) {
        this._url = url

        for (const prop in endpoints) {
            endpoints[prop] = { ...endpoints[prop], name: prop }
        }
    }

    /**
     * Fonction interne pour le prétraitement d'un endpoint avant fetch.
     * @private
     * @param {Endpoint} endpoint - Paramètres de endpoint avec le nom.
     * @param {Object} endpointArgs - Arguments spécifiques au endpoint.
     * @returns {ProprocessedEndpoint} Objet représentant le endpoint prétraité.
     */
    _endpointPreprocessing(endpoint, endpointArgs = {}) {
        const { name, route, field, output } = endpoint

        /**
         * Remplace les paramètres de chemin dynamiques dans la route par leurs valeurs correspondantes.
         * @private
         * @param {string} route - La route avec des paramètres dynamiques (p. ex. ":id").
         * @param {Object} endpointArgs - Arguments spécifiques au point de terminaison.
         * @returns {string} La route avec les paramètres remplacés.
         */
        const replaceArgs = (route, endpointArgs) => {
            return Object.keys(endpointArgs).reduce((newRoute, arg) => {
                return newRoute.replace(`:${arg}`, endpointArgs[arg])
            }, route)
        }

        return {
            name,
            value: `${this._url}${replaceArgs(route, endpointArgs)}`,
            field,
            output,
        }
    }

    /**
     * Effectue une requête pour récupérer des données à partir d'un endpoint.
     * @async
     * @param {Endpoint} endpoint - Paramètres de endpoint avec le nom.
     * @param {Object} endpointArgs - Arguments spécifiques au point de terminaison.
     * @throws {Error} Une erreur si la requête échoue ou si la réponse n'est pas OK.
     * @returns {Promise<Object>} Une promesse résolue avec les données récupérées.
     */
    async fetchEndpoint(endpoint, endpointsArgs) {
        const endpointToRetrieve = this._endpointPreprocessing(endpoint, endpointsArgs)

        try {
            const response = await fetch(endpointToRetrieve.value)
            if (response.ok) {
                let fetchedData = await response.json()
                if (endpointToRetrieve.field) {
                    fetchedData = fetchedData[endpointToRetrieve.field]
                }
                if (endpointToRetrieve.output) {
                    fetchedData = endpointToRetrieve.output(fetchedData)
                }
                return { [endpointToRetrieve.name]: fetchedData }
            } else {
                throw new Error(
                    `${response.status} (${response.statusText}) on the request ${response.url}`
                )
            }
        } catch (error) {
            throw error
        }
    }
}
