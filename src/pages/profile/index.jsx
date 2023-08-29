import { Container } from './styled'

// Context
import { AppContext } from '../../context'
import { useContext, useEffect } from 'react'

function Page() {
    const { dataUser } = useContext(AppContext)

    useEffect(() => console.log(dataUser.userInfos.firstName))

    return (
        <Container>
            <h1>Page de profil</h1>
            <span>
                User Id: {dataUser.id} Firstname: {dataUser.userInfos.firstName}{' '}
                Lastname: {dataUser.userInfos.lastName}
            </span>
        </Container>
    )
}

export default Page
