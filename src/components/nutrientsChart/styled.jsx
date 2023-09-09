import styled from 'styled-components'
import { colors, fonts } from '../../styles'

export const Container = styled.div`
    padding: 15px 0 30px 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 512px;
`
export const ItemWrapper = styled.div`
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
