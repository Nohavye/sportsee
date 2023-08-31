import styled from 'styled-components'
import { fonts, colors } from '../../styles'

export const Container = styled.div`
    position: relative;
    box-sizing: border-box;
    border-radius: 6px;
    width: 99.9%;
    height: 272px;
`
export const Title = styled.h2`
    ${fonts.small_title(colors.dark_gray)}
    position: absolute;
    top: 6px;
    left: 20px;
`
export const Label = styled.div`
    position: absolute;
`
