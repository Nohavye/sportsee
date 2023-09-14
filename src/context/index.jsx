// Context, Hooks
import { createContext, useState } from 'react'

export const AppContext = createContext()

/** Fournisseur de contexte pour l'application.
 * @param {Object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les enfants du composant.
 * @returns {JSX.Element} Fournisseur de contexte.
 */
export function AppProvider({ children }) {
    const [userId, setUserId] = useState(12)
    return <AppContext.Provider value={{ userId, setUserId }}>{children}</AppContext.Provider>
}
