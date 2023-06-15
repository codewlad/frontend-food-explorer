import styled from 'styled-components';
import banner from '../../assets/banner.png';

export const Container = styled.div`
    width: 100%;

    display: grid;
    grid-template-rows: 10.4rem auto;
    grid-template-areas:
    "header"
    "content";
`

export const Content = styled.div`
    grid-area: content;
    margin: 2.6rem 12.3rem 6.2rem;

    .banner { 
        display: flex;
        max-width: 100%;
        position: relative;        
    }

    .wrappedBanner {
        max-width: 65.6rem;
        width: 100%;
        height: 42rem;
        background-image: url(${banner});
        background-size: cover;
        position: relative;
        left: -6rem;
        margin-right: -6rem;
    }

    .slogan {
        min-width: 52rem;
        width: 100%;
        padding: 24.5rem 10rem 0 0;
        text-align: right;
        color: ${({ theme }) => theme.COLORS.LIGHT_300};

        > h1 {
            font: ${({ theme }) => theme.FONTS.POPPINS_500};
        }

        > span {
            font: ${({ theme }) => theme.FONTS.ROBOTO_SMALL_REGULAR};
        }
    }

    .bgBanner {
        width: 100%;
        height: 26rem;
        position: absolute;
        z-index: -1;
        left: 0;
        bottom: 0;
        border-radius: 0.8rem;
        background: ${({ theme }) => theme.COLORS.GRADIENTS_200};
    }

    @media (max-width: 1050px) {
        
    }
`