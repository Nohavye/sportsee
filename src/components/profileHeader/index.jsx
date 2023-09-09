import PropTypes from 'prop-types'
import { Container, Title, FirstName, Text } from './styled'

/**
 * Composant d'accueil de la page de profile.
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.data - Les données d'accueil.
 * @returns {JSX.Element} Composant d'accueil de la page de profile.
 */
function Component({ data }) {
    return (
        <Container>
            <Title>
                Bonjour <FirstName>{data.userInfos.firstName}</FirstName>
            </Title>
            <Text>Félicitation ! Vous avez explosé vos objectifs hier 👏</Text>
        </Container>
    )
}

Component.propTypes = {
    data: PropTypes.object,
}

export default Component
