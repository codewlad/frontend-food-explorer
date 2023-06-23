import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import { TfiSearch, TfiUser } from 'react-icons/tfi'
import { Input } from '../Input';
import { ItemMenu } from '../ItemMenu';
import { Footer } from '../Footer';
import { Profile } from './styles';

export function Menu() {
    const isAdmin = false;
    const [isChecked, setIsChecked] = useState(false);
    const titleMenu = !isChecked ? "titleMenu hide" : "titleMenu";

    const handleIconMenuClick = () => {
        setIsChecked(!isChecked);

        const expandedMenu = document.querySelector(".expandedMenu");

        if (expandedMenu) {
            if (!isChecked) {
                document.documentElement.style.overflowY = "hidden";
                expandedMenu.classList.remove("animateCloseMenu");
                expandedMenu.classList.add("animateOpenMenu");
            } else {
                document.documentElement.style.overflowY = "auto";
                expandedMenu.classList.remove("animateOpenMenu");
                expandedMenu.classList.add("animateCloseMenu");
                setTimeout(() => {
                    expandedMenu.classList.remove("animateCloseMenu");
                }, 300);
            }
        }
    };

    useEffect(() => {
        const expandedMenu = document.querySelector(".expandedMenu");

        const handleResize = () => {
            if (window.innerWidth > 1049) {
                setIsChecked(false);
                expandedMenu.classList.remove("animateOpenMenu");
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
            <div className="iconMenu" onClick={handleIconMenuClick}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={titleMenu}>
                <div>Menu</div>
                <Profile>
                    <TfiUser />
                </Profile>
            </div>

            <div className="expandedMenu">
                <div>
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
                    />
                </div>

                <Footer />
            </div>
        </Container>
    );
}
