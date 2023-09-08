import { Container, ChartsWrapper, ChartsWrapperLeft, ChartsWrapperBottom } from './styled'

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

import { endpoints } from '../../api/apiConstants'

function Page() {
    const { windowIsResizing } = useWindowResizing()
    const { userId } = useContext(AppContext)

    return (
        <Container>
            <Loader
                endpoints={[
                    endpoints.user,
                    endpoints.activity,
                    endpoints.averageSessions,
                    endpoints.performance,
                ]}
                endpointsArgs={{ userId }}
            >
                <ProfileHeader endpoints={[endpoints.user]} />
                {!windowIsResizing && (
                    <ChartsWrapper>
                        <>
                            <ChartsWrapperLeft>
                                <ActivityChart endpoints={[endpoints.activity]} />
                                <ChartsWrapperBottom>
                                    <AverageSessionsChart endpoints={[endpoints.averageSessions]} />
                                    <PerformanceChart endpoints={[endpoints.performance]} />
                                    <ScoreChart endpoints={[endpoints.user]} />
                                </ChartsWrapperBottom>
                            </ChartsWrapperLeft>
                            <NutrientsChart endpoints={[endpoints.user]} />
                        </>
                    </ChartsWrapper>
                )}
            </Loader>
        </Container>
    )
}

export default Page
