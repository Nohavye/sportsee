import { Container, Logo, Navigation, Link } from './styled'

function Component() {
    return (
        <Container>
            <Logo />
            <Navigation>
                <Link to="/">Accueil</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/settings">Réglage</Link>
                <Link to="/community">Communauté</Link>
            </Navigation>
        </Container>
    )
}

export default Component
