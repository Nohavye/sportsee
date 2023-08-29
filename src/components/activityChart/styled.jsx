import styled from 'styled-components'
import { colors, fonts } from '../../styles'

export const Container = styled.div`
    border: 1px solid blue;
    box-sizing: border-box;
    width: 99%;
    height: 300px;
`
export const TooltipWrapper = styled.div`
    background-color: ${colors.secondary};
    padding: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`
export const TooltipText = styled.p`
    color: ${colors.white};
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 10px;
`
