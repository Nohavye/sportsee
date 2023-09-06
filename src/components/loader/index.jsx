import { Container, Spinner } from './styled'
import { useFetch } from '../../hooks'
import React from 'react'

function Loader() {
    return (
        <Container>
            <Spinner />
        </Container>
    )
}

export function Component({ children, endpointNames, endpointsArgs }) {
    const { isLoading, data, error } = useFetch(endpointNames, endpointsArgs)

    return error ? (
        <Container>
            <p>Erreur</p>
        </Container>
    ) : isLoading ? (
        <Container>
            <Spinner />
        </Container>
    ) : (
        React.Children.map(children, (child) => {
            return React.cloneElement(child, { data })
        })
    )
}

export default Loader
