import { Container } from './styles';
import { BsHexagonFill } from 'react-icons/bs'

export function Footer() {
    return (
        <Container>
            <div>
                <BsHexagonFill />food explorer
            </div>
            <span>
                © 2023 - Todos os direitos reservados.
            </span>
        </Container>
    )
}