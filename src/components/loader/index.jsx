import { Container, Spinner } from './styled'
import { useFetch } from '../../hooks'
import React from 'react'

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
            const distributedData = child.props.endpointName ? data[child.props.endpointName] : data
            return React.cloneElement(child, { data: distributedData })
        })
    )
}

export default Component
