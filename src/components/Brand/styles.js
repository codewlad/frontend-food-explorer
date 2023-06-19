import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    div:nth-child(1) {
        display: flex;
        width: max-content;
        font: ${({ theme }) => theme.FONTS.ROBOTO_BIGGER_BOLD};
        color: ${({ theme }) => theme.COLORS.LIGHT_100};

        svg {
            margin-right: 1rem;
            font-size: 2.5rem;
            color: ${({ theme }) => theme.COLORS.CAKE_100};
        }
    }

    div:nth-child(2) {
        font: ${({ theme }) => theme.FONTS.ROBOTO_SMALLEST_REGULAR};
        color: ${({ theme }) => theme.COLORS.CAKE_200};
        text-align: right;
        margin-top: -0.7rem;
    }

    @media (max-width: 1049px) {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;

        div:nth-child(2) {
            margin: 0 0 0 0.8rem;
        }
    }
`