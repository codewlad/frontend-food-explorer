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

    .titleMenu {
        ${({ theme }) => theme.COLORS.LIGHT_100};
        font: normal 2.16rem/2.48rem Roboto, sans-serif;
        z-index: 3;
        animation-name: openMenu;
        animation-duration: 0.3s;
        position: fixed;
        top: 0rem;
        left: 7rem;
        width: calc(100% - 7rem);
        height: 10.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 2.8rem;

        svg {
            font-size: 3rem;
        }
    }

    .hide {
        display: none;
    }

    .expandedMenu{
        display: none;
    }

    @media (max-width: 1049px) {
        display: flex;

        .iconMenu {
            display: flex;
            z-index: 3;
        }

        .checkMenu {
            display: flex;
            position: absolute;
            opacity: 0;
            z-index: -1;
        }

        .expandedMenu {
            position: relative;
            display: none;
            flex-direction: column;
            position: fixed;
            top: 0rem;
            left: 0rem;
            background-color: ${({ theme }) => theme.COLORS.DARK_400};
            height: 100%;
            width: 100%;
            z-index: 2;

            > div:first-child {
                padding: 3.6rem 2.8rem 1.4rem;
                padding-bottom: 7.7rem;
                overflow-y: auto;
                height: 100%;

                > div:first-child {
                    margin-bottom: 3.6rem;
                }

                input {
                    text-align: left;
                }

                svg {
                    margin-left: 1.4rem;
                    width: 2.4rem;
                }
            }
        }

        .expandedMenu::before {
            content: "";
            min-height: 10.4rem;
            background-color: ${({ theme }) => theme.COLORS.DARK_600};
        }

        .footerMenu {
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 7.7rem;
            bottom: 0;
            color: ${({ theme }) => theme.COLORS.LIGHT_700};
            background-color: ${({ theme }) => theme.COLORS.DARK_600};
            font: ${({ theme }) => theme.FONTS.ROBOTO_SMALL_REGULAR};
            font-weight: 700;
            width: 100%;
            
            > svg {
                margin-right: 0.65rem;
            }

            > span {
                color: ${({ theme }) => theme.COLORS.LIGHT_200};
                font: ${({ theme }) => theme.FONTS.ROBOTO_SMALLEST_REGULAR};
                margin-left: 0.8rem;
                padding-top: 0.5rem;
            }
        }

        .animateOpenMenu {
            animation-name: openMenu;
            animation-duration: 0.3s;
            display: flex;
        }

        .animateCloseMenu {
            display: flex;
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

export const Profile = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.COLORS.DARK_900};
    border-radius: 50%;
    min-width: 5.6rem;
    min-height: 5.6rem;
    cursor: pointer;
`