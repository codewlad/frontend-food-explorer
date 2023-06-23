import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from './styles';
import { Brand } from '../Brand';
import { Input } from '../Input';
import { Button } from '../Button';
import { TfiReceipt, TfiUser } from 'react-icons/tfi';
import { FiLogOut } from 'react-icons/fi';
import { Menu } from '../Menu';
import { Profile } from './styles';
import { ItemMenu } from '../ItemMenu';

export function Header() {
    const isAdmin = false;
    const order = 5;
    let queryWidth = 1050;
    const [search, setSearch] = useState("");
    const [hasSearchPlaceholder, setHasSearchPlaceholder] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
    const [isProfileMenuHidden, setIsProfileMenuHidden] = useState(false);

    useEffect(() => {
        setHasSearchPlaceholder(!search);
    }, [search]);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);

            if (window.innerWidth >= queryWidth) {
                setIsProfileMenuHidden(false);
            } else {
                setIsProfileMenuHidden(true);
                setIsProfileMenuVisible(false);
            }
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
                    <Link to="/add">
                        <Button>
                            Novo prato
                        </Button>
                    </Link>
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
                <Profile onClick={() => setIsProfileMenuVisible(!isProfileMenuVisible)}>
                    <TfiUser />
                    <div className={`profile-menu ${isProfileMenuVisible ? 'profile-menu-visible' : 'profile-menu-transition'}`}>
                        <div>
                            <Link to="/add"><ItemMenu icon={TfiUser} title="Atualizar dados" /></Link>
                            <Link to="/dish/1"><ItemMenu icon={FiLogOut} title="Sair" /></Link>
                        </div>
                    </div>
                </Profile>
            )}
        </Container>
    );
}