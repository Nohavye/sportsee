import styled from 'styled-components'
import { fonts, colors } from '../../styles'

export const Container = styled.div`
    background-color: ${colors.dark_gray};
    box-sizing: border-box;
    border-radius: 6px;
    width: 99.9%;
    height: 272px;

    & tspan {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 12px;
    }
`
