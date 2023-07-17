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
        margin: 3.2rem 5.6rem;
        gap: 1.6rem;
    }
`;

export const WrappedPayment = styled.div`
    display: flex;
    gap: 7.5rem;
    justify-content: center;
`;

export const Order = styled.div`
    max-width: 44.4rem;
    width: 100%;
    display: flex;
    flex-direction: column;

    > h2 {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font: ${({ theme }) => theme.FONTS.POPPINS_400};
        margin-bottom: 3.2rem;
    }

    > p {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font: ${({ theme }) => theme.FONTS.POPPINS_200};
        padding: 1.6rem 0;
    }
`;

export const Total = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 3.1rem;
    padding: 1.6rem 0;
    color: ${({ theme }) => theme.COLORS.LIGHT_300};
    font: ${({ theme }) => theme.FONTS.POPPINS_200};

    > div {
        width: 100%;
    }

    > button {
        max-width: 21.6rem;
        display: none;

        @media (max-width: 1049px) {
            display: block;
        }
    }
`

export const ItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: 1.6rem 0;

    > img {
        width: 6.8rem;
        height: 6.8rem;
        margin-right: 1.3rem;
    }
`;

export const ItemInformation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    overflow: hidden;

    strong {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font: ${({ theme }) => theme.FONTS.POPPINS_200};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 74%;
    }

    span {
        color: ${({ theme }) => theme.COLORS.LIGHT_400};
        font: ${({ theme }) => theme.FONTS.ROBOTO_SMALLEST_REGULAR};
        width: 6rem;
        white-space: nowrap;
    }

    > div:nth-child(1) {
        display: flex;
        gap: 1rem;
        align-items: baseline;
        justify-content: space-between;
    }

    > div:nth-child(2) {
        color: ${({ theme }) => theme.COLORS.TOMATO_400};
        font: ${({ theme }) => theme.FONTS.ROBOTO_SMALLEST_REGULAR};
        cursor: pointer;
    }
`;

export const PaymentMethods = styled.div`
    max-width: 53rem;
    width: 100%;   

    > h2 {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font: ${({ theme }) => theme.FONTS.POPPINS_400};
        margin-bottom: 3.2rem;
    }
`;

export const WrappedPaymentMethods = styled.div`
    .creditcard {
        display: grid;
        row-gap: 3.7rem;
        column-gap: 1.7rem;
        grid-template-columns: 50% 50%;
        grid-template-rows: auto auto auto;

        > div:nth-child(1) {
            grid-row: 1;
            grid-column: 1 / span 2;
        }

        > div:nth-child(2) {
            grid-row: 2;
            grid-column: 1;
        }

        > div:nth-child(3) {
            grid-row: 2;
            grid-column: 2;
        }

        > div:nth-child(4) {
            grid-row: 3;
            grid-column: 1 / span 2;

            button {
                height: 5.6rem;
                display: flex;
                align-items: center;
                gap: 0.8rem;
                padding: 1.2rem 3.2rem;
            }

            svg {
                font-size: 2.6rem;
            }
        }
    }
`;

export const PaymentTitle = styled.div`
    display: flex;

    .active {
        background: ${({ theme }) => theme.COLORS.DARK_800};
    }

    > div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 8.1rem;
        flex: 1;
        padding: 1.2rem;
        border: 0.1rem solid ${({ theme }) => theme.COLORS.LIGHT_600};
        color: ${({ theme }) => theme.COLORS.LIGHT_100};
        font: ${({ theme }) => theme.FONTS.ROBOTO_SMALL_REGULAR};

        > svg {
            font-size: 2.4rem;
            margin-right: 0.8rem;
        }

        &:hover {
            cursor: pointer;
        }
    }

    > div:nth-child(1) {
        border-top-left-radius: 0.8rem;
    }

    > div:nth-child(2) {
        border-top-right-radius: 0.8rem;
        border-left: 0;
    }
`;

export const PaymentType = styled.div`
    display: flex;
    justify-content: center;
    padding: 5rem;
    border: 0.1rem solid ${({ theme }) => theme.COLORS.LIGHT_600};
    border-top: 0;
    border-radius: 0 0 0.8rem 0.8rem;

    > img {
        max-width: 25rem;
        width: 100%;
        height: auto;
    }
`;