import { Container, Title, Label } from './styled'
import { colors } from '../../styles'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [{ value: 75 }, { value: 25 }]

function Component() {
    return (
        <Container>
            <Title>Score</Title>
            <Label>
                <span className="percent">18%</span>
                <span>de votre objectif</span>
            </Label>
            <ResponsiveContainer width="99.9%" height="99.9%">
                <PieChart width={50} height={50}>
                    <Pie
                        data={data}
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
