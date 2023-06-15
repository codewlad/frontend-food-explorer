import { Container } from './styles';
import { Placeholder } from '../Placeholder';

export function Input({ searchPlaceholder, ...rest }) {
    return (
        <Container>
            {searchPlaceholder && <Placeholder />}
            <input {...rest} />
        </Container>
    )
}