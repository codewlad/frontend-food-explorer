import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    height: 46.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    color: ${({ theme }) => theme.COLORS.LIGHT_300};
    background-color: ${({ theme }) => theme.COLORS.DARK_200};
    border: 0.1rem solid ${({ theme }) => theme.COLORS.DARK_300};
    border-radius: 0.8rem;
    padding: 2.4rem;
    white-space: nowrap;

    > img {
        max-width: 17.6rem;
        width: 100%;
        height: auto;
    }

    h3 {
        font: ${({ theme }) => theme.FONTS.POPPINS_300_BOLD};
    }

    > p {
        color: ${({ theme }) => theme.COLORS.LIGHT_400};
        font: ${({ theme }) => theme.FONTS.ROBOTO_SMALLER_REGULAR};
    }

    > span {
        color: ${({ theme }) => theme.COLORS.CAKE_200};
        font: ${({ theme }) => theme.FONTS.ROBOTO_BIGGEST_REGULAR};
    }

    .amountOfDishes {
        display: flex;
        gap: 1.6rem;
        width: 100%;

        > div {
            display: flex;
            gap: 1.4rem;
            align-items: center;
            font: ${({ theme }) => theme.FONTS.ROBOTO_BIG_BOLD};
        }

        > button {
            width: 9.2rem;
            height: 4.8rem;
            padding: 1.2rem;
        }
    }

    .topRightButton {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        top: 1.6rem;
        right: 1.6rem;
        font-size: 2.4rem;
    }
`