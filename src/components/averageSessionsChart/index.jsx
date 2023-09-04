import { Container, MaskGradient, Title } from './styled'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

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

function Components({ data }) {
    return (
        <Container>
            <Title>Durée moyenne des sessions</Title>
            <MaskGradient>
                <ResponsiveContainer width="99.9%" height="99.9%">
                    <LineChart
                        data={data.sessions}
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
