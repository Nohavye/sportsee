// Context
import { createContext, useEffect, useState } from 'react'
import { useApi } from '../hooks'

export const AppContext = createContext()

export function AppProvider({ children }) {
    const [userId, setUserId] = useState(18)
    const { data, loading, error, setParams } = useApi({ userId })

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
        setParams({ userId })
    }, [setParams, userId])

    return <AppContext.Provider value={{ data, loading, error }}>{children}</AppContext.Provider>
}
