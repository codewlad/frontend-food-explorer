import { useState, useEffect } from 'react';
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
    let queryWidth = 1050;
    const [search, setSearch] = useState("");
    const [hasSearchPlaceholder, setHasSearchPlaceholder] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
            {windowWidth >= queryWidth && (
                <Input
                    id="searchDishes"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Busque por pratos ou ingredientes"
                    searchPlaceholder={hasSearchPlaceholder}
                />
            )}
            {windowWidth >= queryWidth ? (
                isAdmin ? (
                    <Button>
                        Novo prato
                    </Button>
                ) : (
                    <Button>
                        <TfiReceipt />{`Pedidos (${order})`}
                    </Button>
                )
            ) : (
                isAdmin ? null : (
                    <div className="receiptOrders">
                        <TfiReceipt />
                        <div>
                            {order}
                        </div>
                    </div>
                )
            )}
            {windowWidth >= queryWidth && (
                <div>
                    <FiLogOut />
                </div>
            )}
        </Container>
    );
}