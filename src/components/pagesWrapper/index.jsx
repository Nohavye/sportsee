import { Container, Wrapper } from './styled'

function Component({ children }) {
    return (
        <Container>
            <Wrapper>{children}</Wrapper>
        </Container>
    )
}

export default Component
