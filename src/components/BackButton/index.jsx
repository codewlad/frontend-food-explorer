import { useNavigate } from 'react-router-dom';
import { TfiAngleLeft } from 'react-icons/tfi';
import { Container } from './styles';

export function BackButton() {

    const navigate = useNavigate()

    return (
        <Container onClick={() => navigate("/")}>
            <TfiAngleLeft />voltar
        </Container>
    )
}