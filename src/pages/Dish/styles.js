import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const Content = styled.div`
    padding-top: 10.4rem;
    margin: 3.2rem 12.3rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4.2rem;

    .dish {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4.8rem;

        img {
            max-width: 39rem;
            width: 100%;
            height: auto;
        }
    }

    .dishInformation {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2.4rem;
        color: ${({ theme }) => theme.COLORS.LIGHT_300};

        h1 {
            font: ${({ theme }) => theme.FONTS.POPPINS_500};
        }

        p {
            font: ${({ theme }) => theme.FONTS.POPPINS_300_REGULAR};
        }
    }

    .tagsIngredients {
        display: flex;
        gap: 1.2rem;
        flex-wrap: wrap;
    }

    .dishButon {
        display: flex;
        gap: 3.3rem;
        width: 100%;
        margin-top: 4.8rem;

        > div {
            display: flex;
            gap: 1.4rem;
            align-items: center;
            font: ${({ theme }) => theme.FONTS.ROBOTO_BIG_BOLD};
        }

        button {
            height: 4.8rem;
            min-width: 16.8rem;
            padding: 1.2rem 2.4rem;
            width: fit-content;
        }

        span {
            font: ${({ theme }) => theme.FONTS.ROBOTO_22};
        }

        svg {
            margin-right: 0.75rem;
        }
    }

    @media (max-width: 1049px) {
        margin: 3.2rem 5.6rem;
        gap: 1.6rem;

        .dish {
            flex-direction: column;
            gap: 1.6rem;

            img {
                max-width: 26.4rem;
                width: 100%;
                height: auto;
            }
        }

        .dishInformation {
            align-items: center;
            text-align: center;

            h1 {
                font: ${({ theme }) => theme.FONTS.POPPINS_350};
            }

            p {
                font: ${({ theme }) => theme.FONTS.POPPINS_125};
            }
        }

        .tagsIngredients {
            justify-content: center;
            gap: 2.4rem;
        }

        .dishButon {
            justify-content: center;

            button {
                width: 100%;
                padding: 1.2rem;
            }
        }
    }
`