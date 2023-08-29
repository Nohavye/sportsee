import { Container, Title, FirstName, Text } from './styled'

function Component({ userFirstName }) {
    return (
        <Container>
            <Title>
                Bonjour <FirstName>{userFirstName}</FirstName>
            </Title>
            <Text>Félicitation ! Vous avez explosé vos objectifs hier 👏</Text>
        </Container>
    )
}

export default Component
