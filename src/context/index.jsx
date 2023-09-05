// Context
import { createContext, useEffect, useState } from 'react'
import { useApi } from '../hooks'
import Loader from '../components/loader'

export const AppContext = createContext()

export function AppProvider({ children }) {
    const [userId, setUserId] = useState(12)
    const { data, loading, error, setEndpoints, setMergedEndpointArgs } = useApi()

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.altKey && e.key === 'u') {
                e.preventDefault()
                if (userId === 12) setUserId(18)
                if (userId === 18) setUserId(12)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [userId])

    useEffect(() => {
        setEndpoints(['user', 'activity', 'averageSessions', 'performance'])
        setMergedEndpointArgs({ userId })
    }, [setEndpoints, setMergedEndpointArgs, userId])

    return <AppContext.Provider value={{ data, loading, error }}>{children}</AppContext.Provider>
}

export const LoadingContext = createContext()

export function LoadingProvider({ endpointNames, mergedEndpointArgs, children }) {
    const { data, loading, error, setEndpoints, setMergedEndpointArgs } = useApi()

    useEffect(() => {
        setEndpoints(endpointNames)
        if (mergedEndpointArgs) setMergedEndpointArgs(mergedEndpointArgs)
    }, [endpointNames, mergedEndpointArgs, setEndpoints, setMergedEndpointArgs])

    if (error)
        return (
            <LoadingContext.Provider>
                <span>Oups! Il y a eu un problème ...</span>
            </LoadingContext.Provider>
        )

    return <LoadingContext.Provider value={{ data }}>{loading ? <Loader /> : { children }}</LoadingContext.Provider>
}
