import styled, { keyframes } from 'styled-components'
import { colors } from '../../../styles'

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`
export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`
export const Spinner = styled.div`
    padding: 10px;
    border: 10px solid ${colors.primary};
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-radius: 100%;
    animation: ${rotate} 1s infinite linear;
    height: 100px;
    width: 100px;
`
