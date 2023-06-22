import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
export const Content = styled.div`
    padding-top: 10.4rem;
    margin: 3.2rem 12.3rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    flex-wrap: wrap;
    
    h1 {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font: ${({ theme }) => theme.FONTS.POPPINS_400};
    }

    .dishInformations {
        width: 100%;
        display: grid;
        grid-template-columns: calc((100% - (9 * 3.2rem)) / 10) calc((100% - (9 * 3.2rem)) / 10) calc((100% - (9 * 3.2rem)) / 10) calc((100% - (9 * 3.2rem)) / 10) calc((100% - (9 * 3.2rem)) / 10) calc((100% - (9 * 3.2rem)) / 10) calc((100% - (9 * 3.2rem)) / 10) calc((100% - (9 * 3.2rem)) / 10) calc((100% - (9 * 3.2rem)) / 10) calc((100% - (9 * 3.2rem)) / 10);
        grid-template-rows: auto auto auto auto;
        gap: 3.2rem;

        input {
            font: ${({ theme }) => theme.FONTS.ROBOTO_SMALL_REGULAR};
        }

        select, textarea, > div:nth-child(1) button, > div:nth-child(4) > div {
            width: 100%;
            height: 4.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${({ theme }) => theme.COLORS.LIGHT_100};
            background-color: ${({ theme }) => theme.COLORS.DARK_900};
            font: ${({ theme }) => theme.FONTS.ROBOTO_SMALL_REGULAR};
            border: 0;
            border-radius: 0.5rem;
        }

        > div:nth-child(1) {
            grid-row: 1;
            grid-column: 1 / span 3;
            
            svg {
                font-size: 2.4rem;
                margin-right: 0.8rem;
            }
        }

        > div:nth-child(2) {
            grid-row: 1;
            grid-column: 4 / span 4;
        }

        > div:nth-child(3) {
            grid-row: 1;
            grid-column: 8 / span 3;

            select {
                padding: 0 1.6rem;
            }
        }

        > div:nth-child(4) {
            grid-row: 2;
            grid-column: 1 / span 8;

            > div {
                height: auto;
                gap: 1.6rem;
                flex-wrap: wrap;
                justify-content: left;
                padding: 0.8rem;
            }
        }

        > div:nth-child(5) {
            grid-row: 2;
            grid-column: 9 / span 2;
        }

        > div:nth-child(6) {
            grid-row: 3;
            grid-column: 1 / span 10;

            textarea {
                height: 17.2rem;
                padding: 1.6rem;
                resize: none;
            }
        }

        > div:nth-child(7) {
            grid-row: 4;
            grid-column: 1 / span 10;
            justify-content: right;
            display: flex;
            gap: 3.2rem;

            button {
                width: fit-content;
                padding: 1.2rem 2.4rem;
            }

            > button:nth-child(1) {
                background-color: ${({ theme }) => theme.COLORS.DARK_900};
            }

            > button:nth-child(2) {
                background-color: ${({ theme }) => theme.COLORS.TOMATO_400};
            }
        }
    }

    @media (max-width: 1049px) {
        margin: 3.2rem;
        
        .dishInformations {
            display: flex;
            flex-direction: column;
            gap: 2.4rem;

            input {
                font: ${({ theme }) => theme.FONTS.ROBOTO_SMALL_REGULAR};
            }

            > div:nth-child(4) > div > div {
                max-width: calc(50% - 0.8rem);
            }

            > div:nth-child(7) {
                gap: 2.4rem;

                button {
                    width: 50%;
                    padding: 1.2rem;
                }
            }
        }
    }
`