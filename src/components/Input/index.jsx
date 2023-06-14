import { Container } from './styles';
import { Placeholder } from '../Placeholder';

export function Input({ placeholder = false, ...rest }) {
    return (
        <Container>
            {placeholder && <Placeholder />}
            <input {...rest} />
        </Container>
    )
}