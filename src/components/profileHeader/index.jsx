import { Container, Title, FirstName, Text } from './styled'

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

export default Component
