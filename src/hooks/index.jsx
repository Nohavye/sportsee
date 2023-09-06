// Hooks
import { useCallback, useEffect, useState } from 'react'

// Api
import apiSettings from '../api'
import Entity from '../api/Entities'

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

export function useFetch(endpointNames, endpointsArgs) {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
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
                    const keyData = endpoint.key ? jsonData[endpoint.key] : jsonData
                    const formatedData = endpoint.outputEntity ? Entity.create(keyData, endpoint.output) : keyData
                    dataList[name] = formatedData
                } else {
                    throw new Error(`${response.status} (${response.statusText}) on the request ${response.url}`)
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

        loadEndpoints()
    }, [endpointNames, endpointsArgs, error])

    return { isLoading, data, error }
}
