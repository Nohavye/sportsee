import styled from 'styled-components'
import { colors, fonts } from '../../styles'

export const Container = styled.div``
export const ItemWrapper = styled.div`
    padding: 45px 0 45px 45px;
    display: flex;
    align-items: center;
    gap: 20px;
`
export const IconWrapper = styled.div`
    border-radius: 10%;
    width: 60px;
    height: 60px;

    display: flex;
`
export const NutrientIcon = styled.img`
    margin: auto;
    width: 20px;
`
export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
export const NutrientValue = styled.span`
    ${fonts.xl_label(colors.dark_gray)}
`
export const NutrientLabel = styled.span`
    ${fonts.medium_label(colors.neutral_gray)}
`
