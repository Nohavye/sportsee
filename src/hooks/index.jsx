// Hooks
import { useCallback, useEffect, useState } from 'react'

// Api
import apiHandler from '../api'

export function useApi() {
    const [endpoints, setEndpoints] = useState()
    const [mergedEndpointArgs, setMergedEndpointArgs] = useState({})
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        apiHandler.setDefaultEndpointArgs({ userId: '12' })

        apiHandler.attachDataListener((value) => {
            setData(value)
        })
        apiHandler.attachLoadingListener((value) => {
            setLoading(value)
        })
        apiHandler.attachErrorListener((value) => {
            setError(value)
        })

        return () => {
            apiHandler.detachListeners()
        }
    }, [])

    useEffect(() => {
        if (endpoints) apiHandler.loadEndpoints(endpoints, mergedEndpointArgs)
    }, [mergedEndpointArgs, endpoints])

    return { data, loading, error, setEndpoints, setMergedEndpointArgs }
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
