import { Container, TooltipWrapper, TooltipText } from './styled'
import { colors } from '../../styles'

import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

const data = [
    {
        day: '2020-07-01',
        kilogram: 70,
        calories: 240,
    },
    {
        day: '2020-07-02',
        kilogram: 69,
        calories: 220,
    },
    {
        day: '2020-07-03',
        kilogram: 70,
        calories: 280,
    },
    {
        day: '2020-07-04',
        kilogram: 70,
        calories: 500,
    },
    {
        day: '2020-07-05',
        kilogram: 69,
        calories: 160,
    },
    {
        day: '2020-07-06',
        kilogram: 69,
        calories: 162,
    },
    {
        day: '2020-07-07',
        kilogram: 69,
        calories: 390,
    },
]

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <TooltipWrapper>
                <TooltipText>{`${payload[0].value}Kg`}</TooltipText>
                <TooltipText>{`${payload[1].value}Kcal`}</TooltipText>
            </TooltipWrapper>
        )
    }

    return null
}

const LegendText = (value) => {
    switch (value) {
        case 'kilogram':
            return <span style={{ color: colors.black }}>{'Poids (kg)'}</span>
        case 'calories':
            return (
                <span style={{ color: colors.black }}>
                    {'Calories brûlées (kCal)'}
                </span>
            )
        default:
            return
    }
}

function Component() {
    return (
        <Container>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} barGap={10}>
                    <CartesianGrid strokeDasharray="3" vertical={false} />
                    <XAxis dataKey="day" style={{ fontSize: '10px' }} />
                    <YAxis
                        yAxisId="kilogram"
                        dataKey="kilogram"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
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
                        barSize={10}
                        radius={[5, 5, 0, 0]}
                    />
                    <Bar
                        yAxisId="calories"
                        dataKey="calories"
                        fill={colors.secondary}
                        barSize={10}
                        radius={[5, 5, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Container>
    )
}

export default Component
