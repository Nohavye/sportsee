// Hooks
import { useCallback, useEffect, useState } from 'react'

/**
 * Hook personnalisé pour détecter les redimensionnements de la fenêtre.
 * @returns {Object} Un objet contenant une valeur booléenne indiquant si la fenêtre est en cours de redimensionnement.
 */
export function useWindowResizing() {
    const [windowIsResizing, setWindowIsResizing] = useState(false)

    const reset = useCallback(() => {
        setTimeout(() => {
            setWindowIsResizing(false)
        }, 200)
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
