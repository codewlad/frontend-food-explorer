import styled from 'styled-components';

export const Container = styled.button`
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.TOMATO_100};
    color: ${({ theme }) => theme.COLORS.LIGHT_100};
    font: ${({ theme }) => theme.FONTS.POPPINS_100};
    padding: 1.2rem;
    border: none;
    border-radius: 0.5rem;
`