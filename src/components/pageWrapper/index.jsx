import { Container } from './styled'

// Hooks
import { useEffect, useState } from 'react'

// Components
import Sidebar from '../sidebar'

function Component({ children }) {
    const [height, setHeight] = useState()

    const heightContainer = () => `
        ${window.innerHeight - document.querySelector('header').clientHeight}px
    `

    useEffect(() => {
        const handleWindowResize = () => setHeight(heightContainer())
        setTimeout(() => setHeight(heightContainer()), 25)
        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    return (
        <Container style={{ height: height }}>
            <Sidebar />
            {children}
        </Container>
    )
}

export default Component
