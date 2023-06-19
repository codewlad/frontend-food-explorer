import styled from 'styled-components';

export const Container = styled.div`
    max-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    margin: 0 12.3rem;
    position: relative;

    > h2 {
        position: relative;
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font: ${({ theme }) => theme.FONTS.POPPINS_400};
        margin-bottom: 2.4rem;
        z-index: 1;
    }

    .carouselControls {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-between;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        padding: 0 1rem;
        //background-color: rgb(0,0,255,0.5);
        font-size: 2.7rem;
        z-index: 1;

        :hover {
            cursor: pointer;
        }
    }

    .gradientLeft, .gradientRight {
        position: absolute;
        top: 0rem;
        height: 100%;
        width: 27.7rem;
        background: ${({ theme }) => theme.COLORS.GRADIENTS_100};
        pointer-events: none;
    }

    .gradientLeft {
        left: -0.1rem;
        transform: matrix(-1, 0, 0, 1, 0, 0);
    }

    .gradientRight {
        right: 0rem;
    }

    @media (max-width: 1049px) {
        margin: 0 2.8rem;
    }
`

export const Content = styled.div`
    position: relative;
    display: flex;
    gap: 2.7rem;   
    white-space: nowrap; /* Impede a quebra de linha do conteúdo */
    //border: 1px solid red;
    padding: 0 15rem;

    overflow-x: auto; /* Adiciona rolagem horizontal quando necessário */
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none; /* Oculta a barra de rolagem no Internet Explorer e Microsoft Edge */
    scrollbar-width: none; /* Oculta a barra de rolagem no Firefox */

    &::-webkit-scrollbar {
        display: none; /* Oculta a barra de rolagem no Chrome, Safari e Opera */
    }

    > div {
        scroll-snap-align: center;
    }

    @media (max-width: 1049px) {
        padding: 0 4rem;
    }
`