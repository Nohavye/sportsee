import { Container, Link, Label } from './styled'

// Assets
import icon_yoga from '../../assets/icon_yoga.svg'
import icon_swimming from '../../assets/icon_swimming.svg'
import icon_cycling from '../../assets/icon_cycling.svg'
import icon_bodybuilding from '../../assets/icon_bodybuilding.svg'

/** Composant de la barre latérale.
 * @returns {JSX.Element} Composant de la barre latérale.
 */
function Component() {
    return (
        <Container>
            <Link to="">
                <img src={icon_yoga} alt="icon" />
            </Link>
            <Link to="">
                <img src={icon_swimming} alt="icon" />
            </Link>
            <Link to="">
                <img src={icon_cycling} alt="icon" />
            </Link>
            <Link to="">
                <img src={icon_bodybuilding} alt="icon" />
            </Link>
            <Label>Copiryght, SportSee 2020</Label>
        </Container>
    )
}

export default Component
