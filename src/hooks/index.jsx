// Hooks
import { useCallback, useEffect, useState } from 'react'

// Data Tools
import { EntityFactory } from '../data/EntityFactory'

/**
 * Hook personnalisé pour effectuer des requêtes de données.
 *
 * @param {string} url - L'URL à partir de laquelle les données doivent être récupérées.
 * @returns {Object} Les fonctions et les états pour gérer les requêtes de données.
 */
export function useFetch(url, route, key) {
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
                const data = await response.json()
                key ? setData(data[key]) : setData(data)
            } catch (error) {
                console.error(error)
                console.log('Erreuuuuur !!!')
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

export function useData(json_data, entityFormat) {
    const [data, setData] = useState({})

    useEffect(() => {
        if (!json_data) return

        setData(new EntityFactory(json_data.data, entityFormat))
    }, [entityFormat, json_data])

    return { data }
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
