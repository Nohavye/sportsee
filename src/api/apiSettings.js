// eslint-disable-next-line no-unused-vars
import { EntityFormats } from './Entities/EntityFactory'

/**
 * @typedef {Object} EndpointSetting
 * @property {string} name - Le nom de la configuration de l'endpoint.
 * @property {string} route - La route de l'API.
 * @property {string} dataField - Le nom du champ de données à extraire de la réponse de l'API.
 * @property {EntityFormats} output - Le format de sortie de l'API, représenté avec l'enum EntityFormats.
 */

/**
 * Fonction pour définir les paramètres de configuration d'un endpoint de l'API.
 * @function
 * @param {Object} options - Les options de configuration d'endpoint.
 * @param {string} options.name - Le nom de la configuration de l'endpoint.
 * @param {string} options.route - La route de l'API.
 * @param {string} options.dataField - Le nom du champ de données à extraire de la réponse de l'API.
 * @param {EntityFormats} options.output - Le format de sortie de l'API.
 * @returns {EndpointSetting} Les paramètres de configuration de l'endpoint.
 */
export const endpointSetting = ({ name, route, dataField, output }) => {
    return { name, route, dataField, output }
}

/**
 * Classe représentant les paramètres de configuration de l'API.
 * @class
 */
export class ApiSettings {
    /**
     * Crée une instance de ApiSettings.
     * @constructor
     * @param {string} url - L'URL de base de l'API.
     * @param {Array<EndpointSetting>} endpointSettings - Les paramètres de configuration pour les endpoints de l'API.
     */
    constructor(url, endpointSettings) {
        this._endpoints = {}

        endpointSettings.forEach((setting) => {
            this._endpoints[setting.name] = {
                value: `${url}${setting.route}`,
                dataField: setting.dataField,
                output: setting.output,
            }
        })
    }

    /**
     * Remplace les paramètres dynamiques dans la valeur de l'endpoint par leurs valeurs réelles.
     * @private
     * @param {string} endpointValue - La valeur de l'endpoint avec des paramètres dynamiques.
     * @param {Object} endpointArgs - Les paramètres réels à remplacer.
     * @returns {string} La valeur de l'endpoint mise à jour.
     */
    _replaceParams(endpointValue, endpointArgs = {}) {
        let newEndpointValue = endpointValue
        for (const arg in endpointArgs) {
            newEndpointValue = newEndpointValue.replace(`:${arg}`, endpointArgs[arg])
        }
        return newEndpointValue
    }

    /**
     * Retourne un endpoint avec les paramètres réels.
     * @param {string} name - Le nom de l'endpoint.
     * @param {Object} endpointArgs - Les paramètres réels à remplacer dans l'endpoint.
     * @returns {Object} L'endpoint avec les paramètres réels.
     */
    getEndpoint(name, endpointArgs = {}) {
        const endpoint = { ...this._endpoints[name] }
        endpoint.value = this._replaceParams(endpoint.value, endpointArgs)
        return endpoint
    }

    /**
     * Retourne la liste des noms d'endpoints disponibles.
     * @returns {Array<string>} La liste des noms d'endpoints.
     */
    getEndpointsNames() {
        return Object.keys(this._endpoints)
    }
}
