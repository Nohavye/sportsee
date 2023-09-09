import styled from 'styled-components'
import { colors, fonts } from '../../styles'
import { Link as RouterLink } from 'react-router-dom'

// Assets
import logo from '../../assets/sportsee_logo.svg'

export const Container = styled.header`
    box-sizing: border-box;
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 92px;
    padding: 0 40px;
    background-color: ${colors.black};
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
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
