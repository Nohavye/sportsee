// Context
import { createContext } from 'react'

// Hooks
import { useData } from '../hooks'

// Mocked Data
import data_user from '../data/mockedData/user.json'

// Data Tools
import { EntityFormats } from '../data/EntityFactory'

export const AppContext = createContext()

export function AppProvider({ children }) {
    const { data } = useData(data_user, EntityFormats.user)

    return (
        <AppContext.Provider value={{ dataUser: data }}>
            {children}
        </AppContext.Provider>
    )
}
