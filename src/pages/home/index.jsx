import { Container } from './styled'
import { useFetch } from '../../hooks'

function Page() {
    const { reload, data, isLoading, error } = useFetch(
        'http://localhost:3000',
        '/user/18',
        'data'
    )

    console.log(data)

    return (
        <Container>
            <h1>Page d'accueil</h1>
        </Container>
    )
}

export default Page
