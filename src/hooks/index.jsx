// Hooks
import { useCallback, useEffect, useState } from 'react'

// Data Tools
import { entity } from '../data'

/**
 * Hook personnalisé pour effectuer des requêtes de données.
 *
 * @param {string} url - L'URL à partir de laquelle les données doivent être récupérées.
 * @returns {Object} Les fonctions et les états pour gérer les requêtes de données.
 */
export function useFetch({ url, route, key }, entityFormat) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [isReloading, setReloading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url) return
        if (!route) return

        const urlRoute = url + route

        /**
         * Effectue la requête de données.
         */
        async function fetchData() {
            setLoading(true)

            try {
                const response = await fetch(urlRoute)
                if (response.ok) {
                    const jsonData = await response.json()
                    const retunedData = key ? jsonData[key] : jsonData
                    entityFormat
                        ? setData(entity.create(retunedData, entityFormat))
                        : setData(retunedData)
                } else {
                    throw new Error(
                        `${response.status} (${response.statusText}) on the request ${response.url}`
                    )
                }
            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        setReloading(false)
    }, [url, route, key, isReloading])

    /**
     * Recharge les données.
     */
    const reload = () => setReloading(true)

    return { reload, data, isLoading, error }
}

export function useWindowResizing() {
    const [windowIsResizing, setWindowIsResizing] = useState(false)

    const reset = useCallback(() => {
        setTimeout(() => {
            setWindowIsResizing(false)
        }, 250)
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
