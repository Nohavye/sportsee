import styled from 'styled-components'
import { fonts, colors } from '../../styles'

export const Container = styled.div`
    position: relative;
    background-color: ${colors.primary};
    box-sizing: border-box;
    border-radius: 6px;
    width: 99.9%;
    height: 320px;
`
export const MaskGradient = styled.div`
    mask-image: linear-gradient(to right, #ffffff99, white);
    width: 100%;
    height: 100%;
`
export const Title = styled.h2`
    ${fonts.small_title('#ffffffaa')}
    position: absolute;
    top: 20px;
    left: 20px;
    width: 148px;
`
