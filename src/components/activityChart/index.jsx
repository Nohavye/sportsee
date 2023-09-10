import PropTypes from 'prop-types'
import { Container, Title } from './styled'
import { CustomTooltip, legendText, fontAxisStyle } from './utils'
import { colors } from '../../styles'

// Recharts
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

/** Composant de graphique pour afficher l'activité quotidienne.
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.data - Les données à afficher dans le graphique.
 * @returns {JSX.Element} Composant de graphique.
 */
function Component({ data }) {
    return (
        <Container>
            <Title>Activité quotidienne</Title>

            <ResponsiveContainer width="99.9%" height="99.9%">
                <BarChart data={data.sessions} barGap={8}>
                    <CartesianGrid strokeDasharray="3" vertical={false} />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        stroke={colors.light_gray}
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
                        stroke={colors.light_gray}
                        style={fontAxisStyle}
                    />
                    <YAxis yAxisId="calories" hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ paddingBottom: '30px' }}
                        formatter={legendText}
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

Component.propTypes = {
    data: PropTypes.object,
}

export default Component
