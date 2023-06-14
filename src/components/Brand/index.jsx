import { Container } from './styles';
import brandImg from '../../assets/polygon.svg';

export function Brand({ isAdmin = false }) {
    return (
        <Container>
            <div>
                <img src={brandImg} alt="Polígono azul" />
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