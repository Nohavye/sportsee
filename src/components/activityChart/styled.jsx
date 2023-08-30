import styled from 'styled-components'
import { fonts, colors } from '../../styles'

export const Container = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 99.9%;
    height: 320px;
`
export const Title = styled.h2`
    ${fonts.small_title(colors.dark_gray)}
    position: absolute;
    top: 6px;
`
