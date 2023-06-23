import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 7.3rem;

    div:nth-child(1) {
        font: ${({ theme }) => theme.FONTS.ROBOTO_GIANT_BOLD};

        > svg {
            font-size: 4.75rem;
        }
    }

    @media (max-width: 1049px) {
        flex-direction: column;
        justify-content: right;
        min-width: 39.8rem;
        max-width: 47.6rem;
    }    
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    max-width: 47.6rem;
    width: 100%;
    padding: 6.4rem;
    border-radius: 1.6rem;
    color: ${({ theme }) => theme.COLORS.LIGHT_100};
    background-color: ${({ theme }) => theme.COLORS.DARK_700};

    > h1 {
        font: ${({ theme }) => theme.FONTS.POPPINS_400};
        text-align: center;
    }

    > div {
        gap: 0.8rem;
    }

    > a {
        font: ${({ theme }) => theme.FONTS.POPPINS_100};
        text-align: center;
    }

    @media (max-width: 1049px) {
        background-color: transparent;
        padding: 4.6rem;
    }
`;