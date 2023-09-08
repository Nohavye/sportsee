import { Container } from './styled'

import Loader from '../../components/loader'
import { endpoints } from '../../api/apiConstants'

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
                endpoints={[endpoints.user, endpoints.activity]}
                endpointsArgs={{ userId: '12' }}
            >
                <div className="parentWrapper" style={{ border: '1px solid red' }}>
                    <ChildComponents endpoints={[endpoints.user, endpoints.activity]}>
                        <ChildComponents endpoints={[endpoints.user]} />
                        <ChildComponents endpoints={[endpoints.activity]} />
                    </ChildComponents>
                </div>
                <div></div>
            </Loader>
        </Container>
    )
}

export default Page
