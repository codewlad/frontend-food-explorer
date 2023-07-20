import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const Content = styled.div`
    padding-top: 10.4rem;
    margin: 3.2rem 12.3rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4.2rem;

    @media (max-width: 1049px) {
        margin: 3.2rem 2.8rem;
        gap: 1.6rem;
    }
`;