import { Container, Spinner } from './styled'
import { useFetch } from '../../hooks'
import React from 'react'

/**
 * Composant permettant de gérer les données provenant de plusieurs endpoints de l'API.
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les éléments enfants à afficher.
 * @param {Array<string>} props.endpointNames - Les noms des endpoints à appeler.
 * @param {Object} props.endpointsArgs - Les arguments à passer aux endpoints (paramètres dynamiques).
 * @param {string} [props.errorMessage] - Message d'erreur à afficher en cas d'échec (optonnel).
 * @returns {ReactNode} Le contenu du composant en fonction de l'état de la requête.
 *
 * @example
 * // Exemple d'utilisation du composant pour charger les données de l'utilisateur et de l'activité.
 * function App() {
 *   const endpointNames = ['user', 'activity'] // Les noms des endpoints à appeler
 *   const endpointsArgs = { userId: 123 } // Les arguments à passer aux endpoints
 *
 *   return (
 *     <Loader endpointNames={endpointNames} endpointsArgs={endpointsArgs}>
 *       <div className="parentWrapper">
 *
 *         <ChildComponent endpointName="user">
 *           <Content />
 *         </ChildComponent>
 *
 *         <ChildComponent endpointName="activity">
 *           <Content />
 *         </ChildComponent>
 *       </div>
 *
 *       <div>
 *         <ChildComponent endpointName="*">
 *           <Content />
 *         </ChildComponent>
 *
 *         <ChildComponentWithoutAPI>
 *           <Content />
 *         </ChildComponentWithoutAPI>
 *       </div>
 *     </Loader>
 *   )
 * }
 */
export function Component({
    children,
    endpoints,
    endpointsArgs,
    errorMessage = 'Oups… Il y a eu un problème pendant le traitement des requêtes.',
}) {
    const { isLoading, data, error } = useFetch(endpoints, endpointsArgs)

    function sendData(endpoints) {
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
                data: sendData(child.props.endpoints),
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

export default Component
