import { Container } from './styled'
import { colors } from '../../styles'

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
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

function Component() {
    return (
        <Container>
            <ResponsiveContainer width="99.9%" height="99.9%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="white" />
                    <PolarAngleAxis
                        dataKey="subject"
                        axisLine={true}
                        tickLine={false}
                        stroke="white"
                    />
                    {/* <PolarRadiusAxis stroke="white" /> */}
                    <Radar
                        name="Mike"
                        dataKey="value"
                        stroke="#ff0000"
                        fill="#ff0000"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </Container>
    )
}

export default Component
