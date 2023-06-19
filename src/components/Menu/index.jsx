import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import { BsHexagonFill } from 'react-icons/bs'
import { TfiSearch } from 'react-icons/tfi'
import { Input } from '../Input';
import { ItemMenu } from '../ItemMenu';

export function Menu() {
    const isAdmin = true;
    const [isChecked, setIsChecked] = useState(false);
    const titleMenu = !isChecked ? "titleMenu hide" : "titleMenu";

    const handleIconMenuClick = () => {
        setIsChecked(!isChecked);

        const expandedMenu = document.querySelector('.expandedMenu');

        if (expandedMenu) {
            if (!isChecked) {
                expandedMenu.classList.remove('animateCloseMenu');
                expandedMenu.classList.add('animateOpenMenu');
            } else {
                expandedMenu.classList.remove('animateOpenMenu');
                expandedMenu.classList.add('animateCloseMenu');
                setTimeout(() => {
                    expandedMenu.classList.remove('animateCloseMenu');
                }, 300);
            }
        }
    };

    useEffect(() => {
        const expandedMenu = document.querySelector('.expandedMenu');

        const handleResize = () => {
            if (window.innerWidth > 1049) {
                setIsChecked(false);
                expandedMenu.classList.remove('animateOpenMenu');
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
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
                Menu
            </div>

            <div className="expandedMenu">
                <div>
                    <Input
                        placeholder="Busque por pratos ou ingredientes"
                        icon={TfiSearch}
                    />
                    {isAdmin ? (
                        <ItemMenu
                            title="Novo prato"
                        />
                    ) : (
                        <ItemMenu
                            title="Favoritos"
                        />
                    )}
                    <ItemMenu
                        title="Sair"
                    />
                </div>

                <div className="footerMenu">
                    <BsHexagonFill /> food explorer <span>© 2023 - Todos os direitos reservados.</span>
                </div>
            </div>
        </Container>
    );
}