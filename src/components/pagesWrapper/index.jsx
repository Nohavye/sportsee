import { Container, BodyPage, Wrapper } from './styled'

/** Composant de mise en page.
 * @param {Object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les éléments enfants à afficher à l'intérieur de la mise en page (<Routes>).
 * @returns {JSX.Element} Composant de mise en page.
 */
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
