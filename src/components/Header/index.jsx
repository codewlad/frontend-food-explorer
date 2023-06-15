import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import { Brand } from '../Brand';
import { Input } from '../Input';
import { Button } from '../Button';
import { TfiReceipt } from 'react-icons/tfi';
import { FiLogOut } from 'react-icons/fi';
import { Menu } from '../Menu';

export function Header() {
    const isAdmin = false;
    const order = 5;
    const [search, setSearch] = useState("");
    const [hasSearchPlaceholder, setHasSearchPlaceholder] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setHasSearchPlaceholder(!search);
    }, [search]);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Container>
            <Menu />
            <Brand isAdmin={isAdmin} />
            {windowWidth >= 1050 && (
                <Input
                    id="searchDishes"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Busque por pratos ou ingredientes"
                    searchPlaceholder={hasSearchPlaceholder}
                />
            )}
            {isAdmin ? (
                <Button>
                    Novo prato
                </Button>
            ) : (
                <Button>
                    <TfiReceipt />{`Pedidos (${order})`}
                </Button>
            )}
            <div>
                <FiLogOut />
            </div>
        </Container>
    );
}