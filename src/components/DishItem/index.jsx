import { TfiPlus, TfiClose } from "react-icons/tfi";
import { Container } from './styles';

export function DishItem({ $isNew, value, onClick, ...rest }) {
    return (
        <Container $isNew={$isNew}>
            <input
                type="text"
                value={value}
                readOnly={!$isNew}
                {...rest}
            />

            <button
                type="button"
                onClick={onClick}
            >
                {$isNew ? <TfiPlus /> : <TfiClose />}
            </button>
        </Container>
    )
}