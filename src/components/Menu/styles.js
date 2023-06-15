import { styled } from 'styled-components';

export const Container = styled.div`
    display: none;    
    
    .iconMenu {
        display: none;
        flex-direction: column;
        justify-content: center;
        width: 2.4rem;
        gap: .5rem;

        span {
            background: ${({ theme }) => theme.COLORS.LIGHT_100};
        }
    }

    .checkMenu {
        position: absolute;
        display: none;
        opacity: 0;
        z-index: -1;
    }

    .checkMenu:focus+.iconMenu {
        outline: 0.1rem solid ${({ theme }) => theme.COLORS.LIGHT_100};
        padding: 0.3rem;
        border-radius: 0.5rem;
    }

    .checkMenu:checked+.iconMenu span:first-child {
        -webkit-transform: translateY(0.8rem) rotate(40deg);
        transform: translateY(0.8rem) rotate(40deg);
    }

    .checkMenu:checked+.iconMenu span:nth-child(2) {
        opacity: 0;
    }

    .checkMenu:checked+.iconMenu span:last-child {
        -webkit-transform: translateY(-0.8rem) rotate(-40deg);
        transform: translateY(-0.8rem) rotate(-40deg);
    }

    .iconMenu span {
        display: block;
        width: 100%;
        height: .3rem;
        border-radius: 0.1rem;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }

    .iconMenu:hover {
        cursor: pointer;
    }

    .hide {
        display: none;
    }

    @media (max-width: 1050px) {
        display: flex;

        .iconMenu {
            display: flex;
        }

        .checkMenu {
            display: flex;
            position: absolute;
            opacity: 0;
            z-index: -1;
        }

        .animateOpenMenu {
            animation-name: openMenu;
            animation-duration: 0.3s;
        }

        .animateCloseMenu {
            animation-name: closeMenu;
            animation-duration: 0.3s;
            animation-fill-mode: forwards;
        }

        @keyframes openMenu {
            from {
                opacity: 0;
                transform: translateX(-340px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes closeMenu {
            from {
                opacity: 1;
                transform: translateX(0px);
            }

            to {
                opacity: 0;
                transform: translateX(-340px);
            }
        }
    }
`