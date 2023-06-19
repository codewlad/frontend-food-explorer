import { Container } from './styles';
import { BsHexagonFill } from 'react-icons/bs'

export function Brand({ isAdmin = false }) {
    return (
        <Container>
            <div>
                <BsHexagonFill />
                food explorer
            </div>
            {isAdmin &&
                <div>
                    admin
                </div>
            }
        </Container>
    )
}