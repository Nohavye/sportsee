import { Container } from './styled'

// Context
import { AppContext } from '../../context'
import { useContext, useEffect } from 'react'

// Components
import ProfileHeader from '../../components/profileHeader'
import ActivityChart from '../../components/activityChart'

function Page() {
    const { dataUser } = useContext(AppContext)
    useEffect(() => console.log(dataUser))

    return (
        <Container>
            {dataUser.userInfos && (
                <ProfileHeader userFirstName={dataUser.userInfos.firstName} />
            )}
            <ActivityChart />
        </Container>
    )
}

export default Page
