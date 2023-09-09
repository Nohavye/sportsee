import styled from 'styled-components'
import { fonts, colors } from '../../styles'

export const Container = styled.div`
    position: relative;
    box-sizing: border-box;
    border-radius: 6px;
    width: 300px;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;

    ${fonts.large_label(colors.neutral_gray)}
    text-align: center;

    & span {
        width: 80px;
    }

    & .percent {
        ${fonts.xxl_label(colors.dark_gray)}
    }
`
