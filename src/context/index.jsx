// Context
import { createContext, useEffect, useState } from 'react'
import { useFetch } from '../hooks'
import { apiRoutes, entity } from '../data'

export const AppContext = createContext()

export function AppProvider({ children }) {
    const [userId, setUserId] = useState(12)
    const userData = useFetch(apiRoutes(userId).user, entity.formats.user)
    console.log(
        userData.data,
        `isLoading: ${userData.isLoading}, error: ${userData.error}`
    )

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

    return (
        <AppContext.Provider value={{ userData }}>
            {children}
        </AppContext.Provider>
    )
}
