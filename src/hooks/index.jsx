// Hooks
import { useCallback, useEffect, useState } from 'react'

// Api
import apiHandler from '../api'

export function useApi() {
    const [params, setParams] = useState()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        apiHandler.addDataListener((value) => {
            setData(value)
        })
        apiHandler.addLoadingListener((value) => {
            setLoading(value)
        })
        apiHandler.addErrorListener((value) => {
            setError(value)
        })

        return () => {
            apiHandler.removeListeners()
        }
    }, [])

    useEffect(() => {
        if (params) apiHandler.loadEndpoints(params)
    }, [params])

    return { data, loading, error, setParams }
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
