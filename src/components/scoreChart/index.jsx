import { Container, Title, Label } from './styled'
import { colors } from '../../styles'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

function Component({ data }) {
    return (
        <Container>
            <Title>Score</Title>
            <Label>
                <span className="percent">{`${data.score[1].value}%`}</span>
                <span>de votre objectif</span>
            </Label>
            <ResponsiveContainer width="99.9%" height="99.9%">
                <PieChart width={50} height={50}>
                    <Pie
                        data={data.score}
                        dataKey="value"
                        innerRadius="80%"
                        outerRadius="90%"
                        fill={colors.primary}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={0}
                        cornerRadius={10}
                    >
                        <Cell key="test" fill="transparent" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </Container>
    )
}

export default Component
