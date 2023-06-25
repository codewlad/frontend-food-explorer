import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 1.6rem;
    border-radius: 0.8rem;
    padding-right: 1.6rem;
    background-color: ${({ theme, $isNew }) => $isNew ? "transparent" : theme.COLORS.LIGHT_600};
    color: ${({ theme, $isNew }) => $isNew ? theme.COLORS.LIGHT_500 : theme.COLORS.LIGHT_100};
    border: ${({ theme, $isNew }) => $isNew ? `1px dashed ${theme.COLORS.LIGHT_500}` : "none"};

    > button {
        border: none;
        background: none;

        svg {
            color: ${({ theme, $isNew }) => $isNew ? theme.COLORS.LIGHT_500 : theme.COLORS.LIGHT_100};
        }
    }

    > input {
        height: 1.6rem;
        width: 100%;
        color: ${({ theme }) => theme.COLORS.LIGHT_100};
        background: transparent;
        border: none;
        outline: none;

        &::placeholder {
            color: ${({ theme }) => theme.COLORS.LIGHT_500};
        }
    }
`;