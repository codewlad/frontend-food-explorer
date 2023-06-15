import { Container } from "./styles";
import { useState } from 'react';

export function Menu() {

    const [isChecked, setIsChecked] = useState(false);

    const handleIconMenuClick = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Container>
            <input
                className="checkMenu"
                type="checkbox"
                checked={isChecked}
                onClick={handleIconMenuClick}
                onChange={() => { }}
            />
            <div
                className="iconMenu"
                onClick={handleIconMenuClick}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </Container>
    )
}