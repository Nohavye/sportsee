import {
    Container,
    ChartsWrapper,
    ChartsWrapperLeft,
    ChartsWrapperBottom,
} from './styled'

// Context
import { AppContext } from '../../context'
import { useContext } from 'react'

// Components
import ProfileHeader from '../../components/profileHeader'
import ActivityChart from '../../components/activityChart'
import NutrientsChart from '../../components/nutrientsChart'
import AverageSessionsChart from '../../components/averageSessionsChart'
import PerformanceChart from '../../components/performanceChart'
import ScoreChart from '../../components/scoreChart'
import Loader from '../../components/loader'

// Hooks
import { useWindowResizing } from '../../hooks'

function Page() {
    const { userData } = useContext(AppContext)
    const { windowIsResizing } = useWindowResizing()

    return (
        <Container>
            {userData.isLoading ? (
                <Loader />
            ) : (
                <>
                    <ProfileHeader
                        userFirstName={userData.data.userInfos.firstName}
                    />
                    {!windowIsResizing && (
                        <ChartsWrapper>
                            <ChartsWrapperLeft>
                                <ActivityChart />
                                <ChartsWrapperBottom>
                                    <AverageSessionsChart />
                                    <PerformanceChart />
                                    <ScoreChart />
                                </ChartsWrapperBottom>
                            </ChartsWrapperLeft>
                            <NutrientsChart data={userData.data.keyData} />
                        </ChartsWrapper>
                    )}
                </>
            )}
        </Container>
    )
}

export default Page
