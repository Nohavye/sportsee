import { Container } from './styled'

// Context
import { AppContext } from '../../context'
import { useContext, useEffect } from 'react'

function Page() {
    const { dataUser } = useContext(AppContext)

    useEffect(() => console.log(dataUser))

    return (
        <Container>
            <h1>Page de profil</h1>
        </Container>
    )
}

export default Page
