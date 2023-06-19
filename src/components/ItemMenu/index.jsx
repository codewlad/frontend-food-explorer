import { Container } from './styles';

export function ItemMenu({ title, ...rest }) {
    return (
        <Container {...rest}>
            {title}
        </Container>
    )
}