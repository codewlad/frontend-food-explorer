import styled from 'styled-components';
import banner from '../../assets/banner.png';

export const Container = styled.div`
    width: 100%;
    gap: 4.8rem;

    display: grid;
    grid-template-rows: 10.4rem auto;
    grid-template-areas:
    "header"
    "content";
`

export const Content = styled.div`
    grid-area: content;
    margin: 2.6rem 12.3rem 0;

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

    @media (max-width: 1049px) {
        margin: 2.6rem 2.8rem 6.2rem;

        .banner { 
            display: flex;
            max-width: 100%;
            position: relative;        
        }

        .wrappedBanner {
            max-width: 19.9rem;
            width: 100%;
            height: 14.9rem;
            background-image: url(${banner});
            background-size: cover;
            position: relative;
            left: -3rem;
            margin-right: -3rem;
        }

        .slogan {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 23.5rem;
            width: 100%;
            padding: 6rem 0 0 0;
            text-align: right;
            color: ${({ theme }) => theme.COLORS.LIGHT_300};
            text-align: left;

            > h1 {
                //font: ${({ theme }) => theme.FONTS.POPPINS_600};
                font: normal 1.8rem/2.52rem Poppins, sans-serif;
                font-weight: 600;
                width: 20.2rem;
            }

            > span {
                display: block;
                font: normal 1.2rem/1.68rem Poppins, sans-serif;
                font-weight: 400;
                width: 20.2rem;
            }
        }

        .bgBanner {
            width: 100%;
            height: 12rem;
            position: absolute;
            z-index: -1;
            left: 0;
            bottom: 0;
            border-radius: 0.8rem;
            background: ${({ theme }) => theme.COLORS.GRADIENTS_200};
        }
    }
`