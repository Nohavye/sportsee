import {
    Container,
    ChartsWrapper,
    ChartsWrapperLeft,
    ChartsWrapperBottom,
} from './styled'

// Context
import { AppContext } from '../../context'

// Hooks
import { useContext } from 'react'
import { useWindowResizing } from '../../hooks'

// Components
import ProfileHeader from '../../components/profileHeader'
import ActivityChart from '../../components/activityChart'
import NutrientsChart from '../../components/nutrientsChart'
import AverageSessionsChart from '../../components/averageSessionsChart'
import PerformanceChart from '../../components/performanceChart'
import ScoreChart from '../../components/scoreChart'
import Loader from '../../components/loader'

function Page() {
    const { windowIsResizing } = useWindowResizing()
    const { userId } = useContext(AppContext)

    return (
        <Container>
            <Loader
                endpointNames={['user', 'activity', 'averageSessions']}
                endpointsArgs={{ userId }}
            >
                <ProfileHeader endpointName="user" />
                {!windowIsResizing && (
                    <ChartsWrapper>
                        <>
                            <ChartsWrapperLeft>
                                <ActivityChart endpointName="activity" />
                                <ChartsWrapperBottom>
                                    <AverageSessionsChart endpointName="averageSessions" />
                                    <PerformanceChart />
                                    <ScoreChart />
                                </ChartsWrapperBottom>
                            </ChartsWrapperLeft>
                            <NutrientsChart endpointName="user" />
                        </>
                    </ChartsWrapper>
                )}
            </Loader>
        </Container>
    )
}

export default Page
