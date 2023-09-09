import { colors } from '../../styles'

export const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const wrapperStyle = {
            backgroundColor: colors.primary,
            padding: '10px',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
        }
        const fontStyle = {
            color: 'white',
            fontFamily: 'Roboto',
            fontWeight: '500',
            fontSize: '10px',
        }
        return (
            <div style={wrapperStyle}>
                <span style={fontStyle}>{`${payload[0].value}Kg`}</span>
                <span style={fontStyle}>{`${payload[1].value}Kcal`}</span>
            </div>
        )
    }

    return null
}

export const legendText = (value) => {
    const fontStyle = {
        color: colors.neutral_gray,
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: '14px',
    }

    switch (value) {
        case 'kilogram':
            return <span style={fontStyle}>{'Poids (kg)'}</span>
        case 'calories':
            return <span style={fontStyle}>{'Calories brûlées (kCal)'}</span>
        default:
            return
    }
}

export const fontAxisStyle = {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '14px',
}
