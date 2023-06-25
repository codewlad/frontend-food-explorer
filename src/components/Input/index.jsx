import { Placeholder } from '../Placeholder';
import { Container } from './styles';

export function Input({ icon: Icon, searchPlaceholder, ...rest }) {
    return (
        <Container>
            {Icon && <Icon size={24} />}
            {searchPlaceholder && <Placeholder />}
            <input {...rest} />
        </Container>
    )
}