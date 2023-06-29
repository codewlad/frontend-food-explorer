import { useNavigate } from 'react-router-dom';
import { TfiAngleLeft } from 'react-icons/tfi';
import { Container } from './styles';

export function BackButton() {

    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    return (
        <Container onClick={handleBack}>
            <TfiAngleLeft />voltar
        </Container>
    )
}