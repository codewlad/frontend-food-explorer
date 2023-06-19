import { Container } from './styles';
import { Placeholder } from '../Placeholder';

export function Input({ icon: Icon, searchPlaceholder, ...rest }) {
    return (
        <Container>
            {Icon && <Icon size={24} />}
            {searchPlaceholder && <Placeholder />}
            <input {...rest} />
        </Container>
    )
}