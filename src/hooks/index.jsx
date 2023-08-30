// Hooks
import { useCallback, useEffect, useState } from 'react'

// Data Tools
import { EntityFactory } from '../data/EntityFactory'

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
