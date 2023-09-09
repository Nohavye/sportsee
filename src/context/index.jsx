// Context
import { createContext, useEffect, useState } from 'react'

export const AppContext = createContext()

/**
 * Composant de fournisseur de contexte pour l'application.
 * @param {Object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les enfants du composant.
 * @returns {JSX.Element} Composant de fournisseur de contexte.
 */
export function AppProvider({ children }) {
    const [userId, setUserId] = useState(12)

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
    })

    return <AppContext.Provider value={{ userId }}>{children}</AppContext.Provider>
}
