import PropTypes from 'prop-types'
import { Container } from './styled'
import { fontAxisStyle } from './utils'
import { colors } from '../../styles'

// Recharts
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

/** Composant affichant les performances.
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.data - Les données pour le graphique.
 * @returns {JSX.Element} Composant affichant un graphique.
 */
function Component({ data }) {
    return (
        <Container>
            <ResponsiveContainer width="99.9%" height="99.9%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.data}>
                    <PolarGrid stroke="white" radialLines={false} />
                    <PolarAngleAxis
                        dataKey="kind"
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

Component.propTypes = {
    data: PropTypes.object,
}

export default Component
