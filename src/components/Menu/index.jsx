import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { TfiSearch, TfiUser } from 'react-icons/tfi';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { Input } from '../Input';
import { ItemMenu } from '../ItemMenu';
import { Footer } from '../Footer';
import { Container, IconMenu, TitleMenu, ExpandedMenu, ExpandedMenuOptions, Profile } from './styles';

export function Menu() {
    const { signOut, user, isAdmin } = useAuth();
    const navigate = useNavigate();

    const avatarUrl = `${api.defaults.baseURL}/files/${user.avatar}`;

    const avatarStyle = {
        backgroundImage: user.avatar ? `url(${avatarUrl})` : 'none'
    };

    const [isChecked, setIsChecked] = useState(false);
    const titleMenu = !isChecked ? "titleMenu hide" : "titleMenu";
    const expandedMenuRef = useRef(null);

    function handleSignOut() {
        navigate("/");
        signOut();
    }

    const handleIconMenuClick = () => {
        setIsChecked(!isChecked);

        if (expandedMenuRef) {
            if (!isChecked) {
                document.documentElement.style.overflowY = "hidden";
                expandedMenuRef.current.classList.remove("animateCloseMenu");
                expandedMenuRef.current.classList.add("animateOpenMenu");
            } else {
                document.documentElement.style.overflowY = "auto";
                expandedMenuRef.current.classList.remove("animateOpenMenu");
                expandedMenuRef.current.classList.add("animateCloseMenu");
                setTimeout(() => {
                    if (expandedMenuRef.current) {
                        expandedMenuRef.current.classList.remove("animateCloseMenu");
                    }
                }, 300);
            }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1049) {
                setIsChecked(false);
                expandedMenuRef.current.classList.remove("animateOpenMenu");
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Container>

            <input
                className="checkMenu"
                type="checkbox"
                checked={isChecked}
                onClick={handleIconMenuClick}
                onChange={() => { }}
            />
            <IconMenu className="iconMenu" onClick={handleIconMenuClick}>
                <span></span>
                <span></span>
                <span></span>
            </IconMenu>
            <TitleMenu className={titleMenu}>
                <span>Menu</span>
                <Link to="/profile">
                    <Profile style={avatarStyle}>
                        {
                            !user.avatar && <TfiUser />
                        }
                    </Profile>
                </Link>
            </TitleMenu>

            <ExpandedMenu ref={expandedMenuRef} className="expandedMenu">
                <ExpandedMenuOptions>
                    <Input
                        placeholder="Busque por pratos ou ingredientes"
                        icon={TfiSearch}
                    />
                    {isAdmin ? (
                        <Link to="/add" onClick={handleIconMenuClick}>
                            <ItemMenu
                                title="Novo prato"
                            />
                        </Link>
                    ) : (
                        <ItemMenu
                            title="Favoritos"
                        />
                    )}
                    <ItemMenu
                        title="Sair"
                        onClick={handleSignOut}
                    />
                </ExpandedMenuOptions>
                <Footer />
            </ExpandedMenu>
        </Container>
    );
}
