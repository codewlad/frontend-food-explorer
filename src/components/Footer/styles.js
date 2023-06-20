import styled from 'styled-components';

export const Container = styled.div`
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
    flex-shrink: 0;

    > svg {
        margin-right: 0.65rem;
    }

    > span {
        color: ${({ theme }) => theme.COLORS.LIGHT_200};
        font: ${({ theme }) => theme.FONTS.ROBOTO_SMALLEST_REGULAR};
        margin-left: 0.8rem;
        padding-top: 0.5rem;
    }
`