import { Container, Spinner } from './styled'
import { useFetch } from '../../hooks'
import React from 'react'

export function Component({ children, endpointNames, endpointsArgs }) {
    const { isLoading, data, error } = useFetch(endpointNames, endpointsArgs)

    function modifiedChild(child) {
        if (child.props.endpointName) {
            return React.cloneElement(child, {
                data: child.props.endpointName === '*' ? data : data[child.props.endpointName],
            })
        } else {
            return child
        }
    }

    function handleChild(child) {
        if (React.isValidElement(child)) {
            let modified = modifiedChild(child)

            if (child.props.children) {
                modified = React.cloneElement(modified, {
                    children: handleChildren(child.props.children),
                })
            }

            return modified
        }

        return child
    }

    function handleChildren(children) {
        const modifiedChildren = React.Children.map(children, (child) => handleChild(child))
        return modifiedChildren
    }

    function parentWrapper(content) {
        const childrenArray = React.Children.toArray(children)
        const parentWrapper = childrenArray.find(
            (child) => child.props.className === 'parentWrapper'
        )

        return parentWrapper ? (
            React.cloneElement(parentWrapper, {}, content)
        ) : (
            <Container>{content}</Container>
        )
    }

    return error
        ? parentWrapper(<p>Erreur</p>)
        : isLoading
        ? parentWrapper(<Spinner />)
        : handleChild(children)
}

export default Component
