import { Container, MaskGradient, Title } from './styled'
import { colors } from '../../styles'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

const data = [
    {
        day: 'L',
        sessionLength: 30,
    },
    {
        day: 'M',
        sessionLength: 40,
    },
    {
        day: 'M',
        sessionLength: 50,
    },
    {
        day: 'J',
        sessionLength: 30,
    },
    {
        day: 'V',
        sessionLength: 30,
    },
    {
        day: 'S',
        sessionLength: 50,
    },
    {
        day: 'S',
        sessionLength: 50,
    },
]

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const wrapperStyle = {
            backgroundColor: 'white',
            padding: '5px 10px',
        }
        const fontStyle = {
            color: 'black',
            fontFamily: 'Roboto',
            fontWeight: '500',
            fontSize: '10px',
        }
        return (
            <div style={wrapperStyle}>
                <span style={fontStyle}>{`${payload[0].value} min`}</span>
            </div>
        )
    }

    return null
}

const fontAxisStyle = {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '12px',
}

function Components() {
    return (
        <Container>
            <Title>Durée moyenne des sessions</Title>
            <MaskGradient>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 20,
                            bottom: 10,
                        }}
                    >
                        <XAxis
                            dataKey="day"
                            type="category"
                            interval="preserveStartEnd"
                            axisLine={false}
                            tickLine={false}
                            stroke="#ffffff"
                            style={fontAxisStyle}
                        />
                        <YAxis
                            type="number"
                            domain={['dataMin - 5', 'dataMax + 20']}
                            hide={true}
                        />
                        <Tooltip content={<CustomTooltip />} />

                        <Line
                            type="monotone"
                            dataKey="sessionLength"
                            stroke="white"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                stroke: '#ffffff55',
                                strokeWidth: 8,
                                r: 4,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </MaskGradient>
        </Container>
    )
}

export default Components
