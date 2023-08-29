import { Container } from './styled'

// Context
import { AppContext } from '../../context'
import { useContext, useEffect } from 'react'

// Components
import ProfileHeader from '../../components/profileHeader'

function Page() {
    const { dataUser } = useContext(AppContext)
    useEffect(() => console.log(dataUser))

    return (
        <Container>
            <ProfileHeader userFirstName={dataUser.userInfos.firstName} />
        </Container>
    )
}

export default Page
