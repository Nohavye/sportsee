// Hooks
import { useCallback, useEffect, useState } from 'react'

// Api
import apiSettings from '../api'
import Entity from '../api/Entities'

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
 * Hook personnalisé pour effectuer des requêtes HTTP en utilisant la configuration de l'API.
 * @function
 * @param {Array<string>} endpointNames - Les noms des endpoints à appeler.
 * @param {Object} endpointsArgs - Les arguments à passer aux endpoints (paramètres dynamiques).
 * @returns {Object} Un objet contenant des informations sur l'état de la requête.
 *
 * @example
 * // Exemple d'utilisation du hook useFetch pour charger les données de l'utilisateur.
 * const { reload, isLoading, data, error } = useFetch(['user'], { userId: 123 });
 */
export function useFetch(endpointNames, endpointsArgs = {}) {
    const [lastEndpointNames, setLastEndpointNames] = useState()
    const [lastEndpointsArgs, setLastEndpointsArgs] = useState()

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isReload, setIsReload] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!endpointNames) return
        const dataList = {}

        async function fetchEndpoint(name, endpointsArgs) {
            const endpoint = apiSettings.getEndpoint(name, endpointsArgs)

            try {
                const response = await fetch(endpoint.value)
                if (response.ok) {
                    const jsonData = await response.json()
                    const dataInField = endpoint.dataField ? jsonData[endpoint.dataField] : jsonData
                    const formatedData = endpoint.output
                        ? Entity.create(dataInField, endpoint.output)
                        : dataInField
                    dataList[name] = formatedData
                } else {
                    throw new Error(
                        `${response.status} (${response.statusText}) on the request ${response.url}`
                    )
                }
            } catch (error) {
                throw error
            }
        }

        function loadEndpoints() {
            setLoading(true)

            const promises = []
            endpointNames.forEach((name) => {
                if (apiSettings.getEndpointsNames().includes(name)) {
                    promises.push(fetchEndpoint(name, endpointsArgs))
                } else {
                    setError(true)
                }
            })

            Promise.all(promises)
                .then(() => {
                    setData(dataList)
                })
                .catch((error) => {
                    setError(true)
                    console.error(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }

        function refreshData() {
            setLastEndpointNames(endpointNames)
            setLastEndpointsArgs(endpointsArgs)
            loadEndpoints()
        }

        function paramsHaveBeenChanged() {
            if (JSON.stringify(lastEndpointNames) !== JSON.stringify(endpointNames)) {
                return true
            }
            if (JSON.stringify(lastEndpointsArgs) !== JSON.stringify(endpointsArgs)) {
                return true
            }
            return false
        }

        if (!lastEndpointNames || isReload) {
            refreshData()
            if (isReload) setIsReload(false)
        } else {
            if (paramsHaveBeenChanged()) refreshData()
        }
    }, [endpointNames, endpointsArgs, lastEndpointNames, lastEndpointsArgs, isReload])

    /**
     * Recharge les données en appelant à nouveau les endpoints avec les paramètres actuels.
     */
    function reload() {
        setIsReload(true)
    }

    return { reload, isLoading, data, error }
}
