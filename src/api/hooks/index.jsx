// Hooks
import { useState, useEffect } from 'react'

// Api
import { ApiHandler } from '../apiHandler'

// Utils
import { deepEqual } from '../utils'

/**
 * Paramètres de endpoint avec le nom.
 * @typedef {Object} Endpoint
 * @property {string} name - Le nom du endpoint.
 * @property {string} route - Le chemin du endpoint.
 * @property {string} field - Le champ de données du endpoint.
 * @property {function} output - La fonction à appliquer sur les données sortantes.
 */
/**
 * Objet fourni par le hook useApi pour gérer les appels à l'API.
 * @typedef {Object} UseApiObject
 * @property {function} reload - Fonction pour forcer le rechargement des données.
 * @property {Boolean} isLoading - Indique si le chargement est en cours.
 * @property {Object.<string, Object>} data - Données récupérées depuis les endpoints.
 * @property {Boolean} error - Indique s'il y a eu une erreur lors de la récupération des données.
 */
/** Hook personnalisé pour gérer les appels à l'API avec plusieurs endpoints.
 * @param {Array<Endpoint>} endpoints - Les endpoints à interroger.
 * @param {Object} [endpointsArgs] - Les arguments spécifiques aux endpoints.
 * @returns {UseApiObject} Un objet pour gérer les appels à l'API.
 */
export function useApi(endpoints, endpointsArgs = {}) {
    const [lastEndpointNames, setLastEndpointNames] = useState()
    const [lastEndpointsArgs, setLastEndpointsArgs] = useState()

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isReload, setIsReload] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!endpoints) return

        function loadEndpoints() {
            setLoading(true)
            setLastEndpointNames(endpoints)
            setLastEndpointsArgs(endpointsArgs)

            const promises = []
            endpoints.forEach((endpoint) => {
                promises.push(ApiHandler.fetchEndpoint(endpoint, endpointsArgs))
            })

            Promise.all(promises)
                .then((dataArray) => {
                    const dataObject = {}
                    dataArray.forEach((data) => {
                        for (const field in data) {
                            dataObject[field] = data[field]
                        }
                    })
                    setData(dataObject)
                })
                .catch((error) => {
                    setError(true)
                    console.error(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }

        function paramsHaveBeenChanged() {
            return (
                !deepEqual(lastEndpointNames, endpoints) ||
                !deepEqual(lastEndpointsArgs, endpointsArgs)
            )
        }

        if (!lastEndpointNames || isReload) {
            loadEndpoints()
            if (isReload) setIsReload(false)
        } else {
            if (paramsHaveBeenChanged()) loadEndpoints()
        }
    }, [endpoints, endpointsArgs, lastEndpointNames, lastEndpointsArgs, isReload])

    function reload() {
        setIsReload(true)
    }

    return { reload, isLoading, data, error }
}
