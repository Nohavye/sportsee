import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Container, Spinner } from './styled'

// Hooks
import { useApi } from '../../hooks'

/**
 * Paramètres de endpoint avec le nom.
 * @typedef {Object} Endpoint
 * @property {string} name - Le nom du endpoint.
 * @property {string} route - Le chemin du endpoint.
 * @property {string} field - Le champ de données du endpoint.
 * @property {function} output - La fonction à appliquer sur les données sortantes.
 */
/** Composant de gestion des appels à l'API
 * avec prise en charge du chargement, des erreurs et de la mise à jour des enfants.
 * @param {Object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les enfants du composant.
 * @param {Array<Endpoint>} props.endpoints - Les endpoints à interroger.
 * @param {Object} props.endpointsArgs - Les arguments spécifiques aux endpoints.
 * @param {string} [props.errorMessage] - Le message d'erreur à afficher en cas d'échec de la requête.
 * @returns {JSX.Element} Composant de gestion des appels à l'API.
 */
export function Component({
    children,
    endpoints,
    endpointsArgs,
    errorMessage = 'Oups… Il y a eu un problème pendant le traitement des requêtes.',
}) {
    const { isLoading, data, error } = useApi(endpoints, endpointsArgs)

    function wrapData(endpoints) {
        let sendedData = {}

        if (endpoints.length > 1) {
            endpoints.forEach((endpoint) => {
                sendedData[endpoint.name] = data[endpoint.name]
            })
        } else if (endpoints.length !== 0) {
            sendedData = data[endpoints[0].name]
        }

        return sendedData
    }

    /**
     * Modifie un enfant React en fonction de son nom d'endpoint.
     * @param {ReactElement} child - L'enfant à modifier.
     * @returns {ReactElement} L'enfant React modifié ou non, en fonction de sa dépendance aux données de l'API.
     * @description
     * Cette fonction prend un enfant React en entrée et examine ses propriétés pour déterminer
     * s'il dépend des données d'un endpoint spécifique. Si l'enfant possède la propriété `endpointName`,
     * la fonction modifie l'enfant pour inclure les données appropriées provenant de la requête API.
     * Si l'enfant n'a pas de `endpointName`, il est renvoyé tel quel sans modification.
     */
    function modifiedChild(child) {
        if (child.props.endpoints) {
            return React.cloneElement(child, {
                data: wrapData(child.props.endpoints),
            })
        } else {
            return child
        }
    }

    function handleChildren(children) {
        const modifiedChildren = React.Children.map(children, (child) => handleChild(child))
        return modifiedChildren
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

    /**
     * Emballe le contenu dans un conteneur parent s'il existe, sinon utilise un
     * conteneur par défaut.
     * @param {ReactNode} content - Le contenu à emballer dans un conteneur parent.
     * @returns {ReactNode} Le contenu emballé dans un conteneur parent ou par défaut.
     * @description
     * Cette fonction examine les éléments enfants React pour trouver un enfant
     * avec une classe CSS spécifique ("parentWrapper"). Si un tel enfant est trouvé,
     * la fonction renvoie une copie de cet enfant avec le contenu passé en argument.
     * Sinon, elle renvoie le contenu emballé dans un conteneur par défaut (<Container>).
     *
     * Elle permet de désigner un conteneur parent pour le loading spinner et le message
     * d'erreur. Si la classe CSS "parentWrapper" n'est pas utilisée alors ils seront
     * emballés dans un conteneur par défaut (<Container>).
     */
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
        ? parentWrapper(<span>{errorMessage}</span>)
        : isLoading
        ? parentWrapper(<Spinner />)
        : handleChildren(children)
}

Component.propTypes = {
    endpoints: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            route: PropTypes.string.isRequired,
            field: PropTypes.string.isRequired,
            output: PropTypes.func.isRequired,
        })
    ).isRequired,
    endpointsArgs: PropTypes.object,
    errorMessage: PropTypes.string,
}

export default Component
