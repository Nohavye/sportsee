import {
    Container,
    ItemWrapper,
    IconWrapper,
    NutrientIcon,
    TextWrapper,
    NutrientValue,
    NutrientLabel,
} from './styled'

import iconCalories from '../../assets/icon_calories.svg'
import iconCarbohydrates from '../../assets/icon_carbohydrates.svg'
import iconLipids from '../../assets/icon_lipids.svg'
import iconProteins from '../../assets/icon_proteins.svg'

function Component({ data }) {
    return (
        <Container>
            <ItemWrapper>
                <IconWrapper style={{ backgroundColor: '#ff000020' }}>
                    <NutrientIcon src={iconCalories} alt="icon" />
                </IconWrapper>
                <TextWrapper>
                    <NutrientValue>
                        {data.keyData.calorieCount}kCal
                    </NutrientValue>
                    <NutrientLabel>Calories</NutrientLabel>
                </TextWrapper>
            </ItemWrapper>

            <ItemWrapper>
                <IconWrapper style={{ backgroundColor: '#4ab8ff20' }}>
                    <NutrientIcon src={iconProteins} alt="icon" />
                </IconWrapper>
                <TextWrapper>
                    <NutrientValue>{data.keyData.proteinCount}g</NutrientValue>
                    <NutrientLabel>Proteines</NutrientLabel>
                </TextWrapper>
            </ItemWrapper>

            <ItemWrapper>
                <IconWrapper style={{ backgroundColor: '#fdcc0c20' }}>
                    <NutrientIcon src={iconCarbohydrates} alt="icon" />
                </IconWrapper>
                <TextWrapper>
                    <NutrientValue>
                        {data.keyData.carbohydrateCount}g
                    </NutrientValue>
                    <NutrientLabel>Glucides</NutrientLabel>
                </TextWrapper>
            </ItemWrapper>

            <ItemWrapper>
                <IconWrapper style={{ backgroundColor: '#fd518120' }}>
                    <NutrientIcon src={iconLipids} alt="icon" />
                </IconWrapper>
                <TextWrapper>
                    <NutrientValue>{data.keyData.lipidCount}g</NutrientValue>
                    <NutrientLabel>Lipides</NutrientLabel>
                </TextWrapper>
            </ItemWrapper>
        </Container>
    )
}

export default Component
