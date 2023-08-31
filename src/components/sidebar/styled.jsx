import styled from 'styled-components'
import { colors, fonts } from '../../styles'
import { Link as RouterLink } from 'react-router-dom'

export const Container = styled.div`
    box-sizing: border-box;
    position: fixed;
    width: 92px;
    height: 100%;
    background-color: ${colors.black};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`
export const Link = styled(RouterLink)`
    box-sizing: border-box;
    width: 64px;
    height: 64px;
    border-radius: 6px;
    background-color: ${colors.white};

    display: flex;
    padding: 10px;
`
export const Label = styled.span`
    ${fonts.small_label(colors.white)}
    position: absolute;
    width: max-content;
    bottom: 100px;
    rotate: -90deg;
`
