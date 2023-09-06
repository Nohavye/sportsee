import { Container } from './styled'

import Loader from '../../components/loader'

function ChildComponents({ data, children }) {
    return (
        <div
            style={{
                border: '1px solid red',
                marginTop: '40px',
                padding: '10px',
            }}
        >
            <p>{JSON.stringify(data)}</p>
            {children}
        </div>
    )
}

function Page() {
    return (
        <Container>
            <h1>Page d'accueil</h1>
            <Loader
                endpointNames={['user', 'activity']}
                endpointsArgs={{ userId: '12' }}
            >
                <div
                    className="parentWrapper"
                    style={{ border: '1px solid red' }}
                >
                    <ChildComponents endpointName="*">
                        <ChildComponents endpointName="user" />
                        <ChildComponents endpointName="activity" />
                    </ChildComponents>
                </div>
                <div></div>
            </Loader>
        </Container>
    )
}

export default Page
