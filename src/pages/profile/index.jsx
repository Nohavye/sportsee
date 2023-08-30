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

function Page() {
    const { dataUser } = useContext(AppContext)
    useEffect(() => console.log(dataUser.keyData))

    return (
        <Container>
            {dataUser.userInfos && (
                <>
                    <ProfileHeader
                        userFirstName={dataUser.userInfos.firstName}
                    />
                    <ChartsWrapper>
                        <ChartsWrapperLeft>
                            <ActivityChart />
                            <ChartsWrapperBottom>
                                <AverageSessionsChart />
                            </ChartsWrapperBottom>
                        </ChartsWrapperLeft>
                        <NutrientsChart data={dataUser.keyData} />
                    </ChartsWrapper>
                </>
            )}
        </Container>
    )
}

export default Page
