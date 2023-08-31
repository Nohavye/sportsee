import {
    Container,
    ChartsWrapper,
    ChartsWrapperLeft,
    ChartsWrapperBottom,
} from './styled'

// Context
import { AppContext } from '../../context'
import { useContext, useEffect } from 'react'

// Components
import ProfileHeader from '../../components/profileHeader'
import ActivityChart from '../../components/activityChart'
import NutrientsChart from '../../components/nutrientsChart'
import AverageSessionsChart from '../../components/averageSessionsChart'
import PerformanceChart from '../../components/performanceChart'
import ScoreChart from '../../components/scoreChart'

// Hooks
import { useWindowResizing } from '../../hooks'

function Page() {
    const { dataUser } = useContext(AppContext)
    const { windowIsResizing } = useWindowResizing()

    useEffect(() => console.log(dataUser.keyData))

    return (
        <Container>
            {dataUser.userInfos && (
                <>
                    <ProfileHeader
                        userFirstName={dataUser.userInfos.firstName}
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
                            <NutrientsChart data={dataUser.keyData} />
                        </ChartsWrapper>
                    )}
                </>
            )}
        </Container>
    )
}

export default Page
