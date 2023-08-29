import styled from 'styled-components'
import { colors, fonts } from '../../styles'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`
export const Title = styled.h1`
    ${fonts.large_title()}
`
export const FirstName = styled.span`
    ${fonts.large_title(colors.primary)}
`
export const Text = styled.span`
    ${fonts.medium_text()}
`
