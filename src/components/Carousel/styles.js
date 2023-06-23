import styled from 'styled-components';

export const Container = styled.div`
    max-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
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
        background-color: rgb(0,0,255,0.5);
        font-size: 2.7rem;
        z-index: 1;

        :hover {
            cursor: pointer;
        }
    }

    .controlLeft, .controlRight {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 25rem;
        height: 5rem;
        width: 5rem;
        font-size: 2.7rem;
        z-index: 1;        
        border-radius: 50%;
        transition: all 0.3s;
        background: transparent;

        svg {
            transition: all ease 0.3s;
        }        

        &:hover {
            cursor: pointer;
            background: ${({ theme }) => theme.COLORS.DARK_1000};
        }

        &:hover svg {
            transform: scale(1.3);
        }
    }

    .controlLeft {
        left: 1rem;        
    }

    .controlRight {
        right: 1rem;
        padding-left: 0.6rem;
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
        .controlLeft {
            left: 0rem;
        }

        .controlRight {
            right: 0rem;
        }
        .gradientLeft, .gradientRight {
            width: 7rem;
        }
    }
`

export const Content = styled.div`
    position: relative;
    display: flex;
    gap: 2.7rem;   
    white-space: nowrap;
    padding: 0 15rem;

    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    > div {
        scroll-snap-align: center;
    }

    @media (max-width: 1049px) {
        padding: 0 4rem;
    }
`