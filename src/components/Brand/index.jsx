import { BsHexagonFill } from 'react-icons/bs'
import { Container, Logo, Admin } from './styles';

export function Brand({ isAdmin = false }) {
    return (
        <Container>
            <Logo>
                <BsHexagonFill />
                food explorer
            </Logo>
            {isAdmin &&
                <Admin>
                    admin
                </Admin>
            }
        </Container>
    )
}