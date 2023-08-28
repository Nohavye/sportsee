import { Container } from './styled'

// Hooks
import { useEffect, useState } from 'react'

// Components
import Sidebar from '../sidebar'

function Component({ children }) {
    const heightContainer = () => `${window.innerHeight - 101}px`
    const [height, setHeight] = useState(heightContainer())

    useEffect(() => {
        const handleWindowResize = () => {
            setHeight(heightContainer())
        }
        window.addEventListener('resize', handleWindowResize)

        return window.removeEventListener('resize', handleWindowResize)
    }, [])

    return (
        <Container style={{ height: height }}>
            <Sidebar />
            {children}
        </Container>
    )
}

export default Component
