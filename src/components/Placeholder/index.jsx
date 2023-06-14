import { Container } from "./styles";
import { TfiSearch } from 'react-icons/tfi'

export function Placeholder() {
    return (
        <Container>
            <TfiSearch />
            <span>Busque por pratos ou ingredientes</span>
        </Container>
    )
}