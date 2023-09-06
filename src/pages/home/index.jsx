import { Container } from './styled'
import { useFetch } from '../../hooks'
import React from 'react'

function WrapperComponent({ children, endpointNames, endpointsArgs }) {
    const { isLoading, data, error } = useFetch(endpointNames, endpointsArgs)

    return error ? (
        <p>Erreur</p>
    ) : isLoading ? (
        <p>loading</p>
    ) : (
        React.Children.map(children, (child) => {
            return React.cloneElement(child, { data })
        })
    )
}

function ChildComponents({ data }) {
    return <p>{JSON.stringify(data)}</p>
}

function Page() {
    return (
        <Container>
            <h1>Page d'accueil</h1>
            <WrapperComponent endpointNames={['user', 'activity']} endpointsArgs={{ userId: '12' }}>
                <ChildComponents />
            </WrapperComponent>
        </Container>
    )
}

export default Page
