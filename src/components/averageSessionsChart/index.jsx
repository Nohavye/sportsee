import PropTypes from 'prop-types'
import { Container, MaskGradient, Title } from './styled'
import { CustomTooltip, fontAxisStyle } from './utils'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

/**
 * Composant de graphique en ligne pour afficher la durée moyenne des sessions.
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.data - Les données à afficher dans le graphique.
 * @returns {JSX.Element} Composant de graphique en ligne.
 */
function Component({ data }) {
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
                            stroke="white"
                            style={fontAxisStyle}
                        />
                        <YAxis type="number" domain={['dataMin - 5', 'dataMax + 20']} hide={true} />
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

Component.propTypes = {
    data: PropTypes.object,
}

export default Component
