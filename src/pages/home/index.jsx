import { Container } from './styled'

import Loader from '../../components/loader'

function ChildComponents({ data }) {
    return <p style={{ border: '1px solid red', marginTop: '40px' }}>{JSON.stringify(data)}</p>
}

function Page() {
    return (
        <Container>
            <h1>Page d'accueil</h1>
            <Loader endpointNames={['user', 'activity']} endpointsArgs={{ userId: '12' }}>
                <ChildComponents endpointName="user" />
                <ChildComponents endpointName="activity" />
            </Loader>
        </Container>
    )
}

export default Page
