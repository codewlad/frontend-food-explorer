import { Container } from './styles';
import { Brand } from '../Brand';
import { Input } from '../Input';
import { useState, useEffect } from 'react';

export function Header() {

    const [search, setSearch] = useState("");
    const [hasPlaceholder, setHasPlaceholder] = useState(true);

    useEffect(() => {
        setHasPlaceholder(!search);
    }, [search])

    return (
        <Container>
            <Brand isAdmin />
            <Input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder={hasPlaceholder}
                aria-label="Busque por pratos ou ingredientes"
            />
        </Container>
    )
}