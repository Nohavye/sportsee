import styled from 'styled-components'
import { colors, fonts } from '../../styles'
import { Link as RouterLink } from 'react-router-dom'

// Assets
import logo from '../../assets/sportsee_logo.svg'

export const Container = styled.header`
    padding: 20px 40px;
    background-color: ${colors.black};
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const Logo = styled.img`
    content: url(${logo});
`
export const Navigation = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`
export const Link = styled(RouterLink)`
    ${fonts.medium_title(colors.white)}
`
