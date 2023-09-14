import { Container, Logo, Navigation, Link } from './styled'

// Context
import { useContext } from 'react'
import { AppContext } from '../../context'

/** Composant header avec navigation.
 * @returns {JSX.Element} Composant header avec navigation.
 */
function Component() {
    const { userId } = useContext(AppContext)

    return (
        <Container>
            <Logo />
            <Navigation>
                <Link to="/">Accueil</Link>
                <Link to={`/profile/${userId}`}>Profile</Link>
                <Link to="/settings">Réglage</Link>
                <Link to="/community">Communauté</Link>
            </Navigation>
        </Container>
    )
}

export default Component
