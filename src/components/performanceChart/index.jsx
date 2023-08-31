import { Container } from './styled'
import { colors } from '../../styles'

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
} from 'recharts'

const data = [
    {
        subject: 'cardio',
        value: 120,
    },
    {
        subject: 'energy',
        value: 98,
    },
    {
        subject: 'endurance',
        value: 86,
    },
    {
        subject: 'strength',
        value: 99,
    },
    {
        subject: 'speed',
        value: 85,
    },
    {
        subject: 'intensity',
        value: 65,
    },
]

const fontAxisStyle = {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '12px',
}

function Component() {
    return (
        <Container>
            <ResponsiveContainer width="99.9%" height="99.9%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="white" radialLines={false} />
                    <PolarAngleAxis
                        dataKey="subject"
                        axisLine={true}
                        tickLine={false}
                        stroke="white"
                        style={fontAxisStyle}
                    />
                    <Radar
                        name="Mike"
                        dataKey="value"
                        stroke={colors.primary}
                        fill={colors.primary}
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </Container>
    )
}

export default Component
