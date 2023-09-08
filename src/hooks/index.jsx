// Hooks
import { useCallback, useEffect, useState } from 'react'

// Api
import { apiHandler } from '../api/apiConstants'

// Utils
import { deepEqual } from '../utils'

/**
 * Hook personnalisé pour détecter les redimensionnements de la fenêtre du navigateur.
 *
 * Ce hook retourne un objet contenant un indicateur indiquant si la fenêtre est en cours de redimensionnement.
 * L'indicateur est réinitialisé après un délai de 200 ms suivant la fin du redimensionnement.
 *
 * @function
 * @returns {Object} Un objet contenant les propriétés suivantes :
 * - `windowIsResizing` (boolean) : Indique si la fenêtre est en cours de redimensionnement.
 *
 * @example
 * // Utilisation du hook dans un composant React
 * const { windowIsResizing } = useWindowResizing();
 *
 * useEffect(() => {
 *   if (windowIsResizing) {
 *     // Le redimensionnement de la fenêtre est en cours...
 *   } else {
 *     // Le redimensionnement de la fenêtre s'est terminé.
 *   }
 * }, [windowIsResizing]);
 */
export function useWindowResizing() {
    const [windowIsResizing, setWindowIsResizing] = useState(false)

    const reset = useCallback(() => {
        setTimeout(() => {
            setWindowIsResizing(false)
        }, 200)
    }, [])

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowIsResizing(true)
            reset()
        }

        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [reset, setWindowIsResizing])

    return { windowIsResizing }
}

/**
 * Paramètres de endpoint.
 * @typedef {Object} EndpointSettings
 * @property {string} name - Le nom du endpoint.
 * @property {string} route - Le chemin du endpoint.
 * @property {string} field - Le champ de données du endpoint.
 * @property {function} output - La fonction à appliquer sur les données sortantes.
 */

/**
 * Hook personnalisé pour effectuer des requêtes HTTP en utilisant le gestionnaire d'API.
 * @function
 * @param {Array<EndpointSettings>} endpoints - Tableau des paramètres de endpoints à appeler.
 * @param {Object} endpointsArgs - Les arguments à passer aux endpoints (paramètres dynamiques).
 * @returns {Object} Un objet contenant des informations sur l'état de la requête.
 *
 * @example
 * // Exemple d'utilisation du hook useFetch pour charger les données de l'utilisateur.
 * const { reload, isLoading, data, error } = useApi([endpoints.user, endpoints.activity], { userId: 18 });
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
                promises.push(apiHandler.fetchEndpoint(endpoint, endpointsArgs))
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

    /**
     * Recharge les données en appelant à nouveau les endpoints avec les paramètres actuels.
     */
    function reload() {
        setIsReload(true)
    }

    return { reload, isLoading, data, error }
}
