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

function Page() {
    const { windowIsResizing } = useWindowResizing()
    const { data, loading, error } = useContext(AppContext)

    return (
        <Container>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <ProfileHeader userFirstName={data.user.userInfos.firstName} />
                    {!windowIsResizing && (
                        <ChartsWrapper>
                            <ChartsWrapperLeft>
                                <ActivityChart data={data.activity} />
                                <ChartsWrapperBottom>
                                    <AverageSessionsChart data={data.averageSessions} />
                                    <PerformanceChart />
                                    <ScoreChart />
                                </ChartsWrapperBottom>
                            </ChartsWrapperLeft>
                            <NutrientsChart data={data.user.keyData} />
                        </ChartsWrapper>
                    )}
                </>
            )}
        </Container>
    )
}

export default Page
