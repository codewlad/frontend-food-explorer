import styled from 'styled-components';

export const Container = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    gap: 3.2rem;
    height: 10.4rem;
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.DARK_600};
    color: ${({ theme }) => theme.COLORS.LIGHT_100};
    padding: 2.8rem 12.3rem;

    input {
        text-align: center;
    }
`