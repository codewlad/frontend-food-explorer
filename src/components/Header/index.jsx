import { Link, useNavigate } from 'react-router-dom';
import { TfiReceipt, TfiUser } from 'react-icons/tfi';
import { FiLogOut } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { Brand } from '../Brand';
import { Input } from '../Input';
import { Button } from '../Button';
import { Menu } from '../Menu';
import { ItemMenu } from '../ItemMenu';
import { Container, ReceiptOrders, Order, Profile, ProfileMenu, ProfileMenuOptions } from './styles';

export function Header() {
    const { signOut, isAdmin } = useAuth();
    const navigate = useNavigate();

    const order = 5;
    const queryWidth = 1050;
    const [search, setSearch] = useState("");
    const [hasSearchPlaceholder, setHasSearchPlaceholder] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
    const [isProfileMenuHidden, setIsProfileMenuHidden] = useState(false);

    function handleSignOut() {
        navigate("/");
        signOut();
    }

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
                    <ReceiptOrders>
                        <TfiReceipt />
                        <Order>
                            {order}
                        </Order>
                    </ReceiptOrders>
                )
            )}
            {windowWidth >= queryWidth && (
                <Profile onClick={() => setIsProfileMenuVisible(!isProfileMenuVisible)}>
                    <TfiUser />
                    <ProfileMenu className={`profile-menu ${isProfileMenuVisible ? 'profile-menu-visible' : 'profile-menu-transition'}`}>
                        <ProfileMenuOptions>
                            <Link to="/add"><ItemMenu icon={TfiUser} title="Atualizar dados" /></Link>
                            <ItemMenu
                                icon={FiLogOut}
                                title="Sair"
                                onClick={handleSignOut}
                            />
                        </ProfileMenuOptions>
                    </ProfileMenu>
                </Profile>
            )}
        </Container>
    );
}