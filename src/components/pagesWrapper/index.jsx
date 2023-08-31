import { Container, BodyPage, Wrapper } from './styled'

function Component({ children }) {
    return (
        <Container>
            <BodyPage>
                <Wrapper>{children}</Wrapper>
            </BodyPage>
        </Container>
    )
}

export default Component
