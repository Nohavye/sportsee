import { Container, Title } from './styled'
import { colors } from '../../styles'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

const data = [
    {
        day: '1',
        kilogram: 70,
        calories: 240,
    },
    {
        day: '2',
        kilogram: 69,
        calories: 220,
    },
    {
        day: '3',
        kilogram: 70,
        calories: 280,
    },
    {
        day: '4',
        kilogram: 70,
        calories: 500,
    },
    {
        day: '5',
        kilogram: 69,
        calories: 160,
    },
    {
        day: '6',
        kilogram: 69,
        calories: 162,
    },
    {
        day: '7',
        kilogram: 69,
        calories: 390,
    },
]

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const wrapperStyle = {
            backgroundColor: '#e60000',
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

const LegendText = (value) => {
    const fontStyle = {
        color: '#74798c',
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

const fontAxisStyle = {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '14px',
}

function Component() {
    return (
        <Container>
            <Title>Activité quotidienne</Title>

            <ResponsiveContainer width="99%" height="99%">
                <BarChart data={data} barGap={8}>
                    <CartesianGrid strokeDasharray="3" vertical={false} />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        stroke="#9b9eac"
                        style={fontAxisStyle}
                    />
                    <YAxis
                        type="number"
                        domain={['dataMin - 5', 'dataMax + 5']}
                        tickCount={3}
                        scale="linear"
                        yAxisId="kilogram"
                        dataKey="kilogram"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        stroke="#9b9eac"
                        style={fontAxisStyle}
                    />
                    <YAxis yAxisId="calories" hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ paddingBottom: '30px' }}
                        formatter={LegendText}
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={10}
                    />
                    <Bar
                        yAxisId="kilogram"
                        dataKey="kilogram"
                        fill={colors.dark_gray}
                        barSize={8}
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        yAxisId="calories"
                        dataKey="calories"
                        fill={colors.secondary}
                        barSize={8}
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Container>
    )
}

export default Component
