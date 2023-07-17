import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { SectionCreditcard } from '../../components/SectionCreditcard';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { MdPix } from "react-icons/md";
import { FaRegCreditCard } from 'react-icons/fa';
import { TfiReceipt } from 'react-icons/tfi';
import defaultDish from '../../../src/assets/dish.svg';
import qrcode from '../../../src/assets/qrcode.jpg';
import { Container, Content, WrappedPayment, Order, Total, ItemOrder, ItemInformation, PaymentMethods, WrappedPaymentMethods, PaymentTitle, PaymentType } from './styles';

export function Payment() {
  const { user, order } = useAuth();

  const [selectedPayment, setSelectedPayment] = useState("pix");
  const [items, setItems] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [verifyingDigit, setVerifyingDigit] = useState("");
  const [paymentData, setPaymentData] = useState(false);

  const formatCardNumber = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\D/g, '');
    const formattedNumber = cleanNumber.replace(/(.{4})/g, '$1 ');

    return formattedNumber.trim().slice(0, 19);
  };

  const handleCardNumberChange = (event) => {
    const inputNumber = event.target.value;
    const formattedNumber = formatCardNumber(inputNumber);

    setCardNumber(formattedNumber);
  };

  const formatExpirationDate = (expirationDate) => {
    const cleanedNumber = expirationDate.replace(/\D/g, '');
    const groups = cleanedNumber.match(/.{1,2}/g);

    if (groups) {
      return groups.join('/');
    }

    return '';
  };

  const handleExpirationDateChange = (event) => {
    const newNumber = event.target.value;
    const formattedNumber = formatExpirationDate(newNumber);

    setExpirationDate(formattedNumber);
  };

  const formatVerifyingDigit = (verifyingDigit) => {
    const cleanNumber = verifyingDigit.replace(/\D/g, '');
    const formattedNumber = cleanNumber.replace(/(.{4})/g, '$1 ');

    return formattedNumber.trim().slice(0, 19);
  };

  const handleVerifyingDigitChange = (event) => {
    const inputNumber = event.target.value;
    const formattedNumber = formatVerifyingDigit(inputNumber);

    setVerifyingDigit(formattedNumber);
  };

  const handlePaymentSelection = (payment) => {
    setSelectedPayment(payment);
  };

  function viewTotalOrder(orderDishes) {
    let total = 0;
    setTotalOrder(0);
    const dishAmount = {};
    const oldItems = JSON.parse(localStorage.getItem("@foodexplorer:order"));

    oldItems.dishes.forEach(dish => {
      dishAmount[dish.dish_id] = dish.amount;
    })

    const updatedOrder = orderDishes.map(orderDish => {
      if (dishAmount[orderDish.id] > 0) {
        const dishTotal = dishAmount[orderDish.id] * orderDish.price;
        setTotalOrder(total += dishTotal);

        return {
          id: orderDish.id,
          image: orderDish.image,
          amount: dishAmount[orderDish.id],
          name: orderDish.name,
          price: dishTotal
        };
      }
    }).filter(item => item !== undefined);

    setItems(updatedOrder);
  };

  function deleteItem(dish_id) {
    const oldItems = JSON.parse(localStorage.getItem("@foodexplorer:order"));
    const newItems = oldItems.dishes.filter(item => item.dish_id !== dish_id);
    const order = {
      user_id: user.id,
      status: "aberto",
      dishes: newItems
    };
    localStorage.setItem("@foodexplorer:order", JSON.stringify(order));
    viewTotalOrder(dishes);
  };

  useEffect(() => {
    const formattedCardNumber = cardNumber.replace(/\D/g, "").length;
    const formattedExpirationDate = expirationDate.replace(/\D/g, "").length;
    const formattedVerifyingDigit = verifyingDigit.length;

    if (formattedCardNumber === 16 && formattedExpirationDate === 4 && formattedVerifyingDigit === 3) {
      setPaymentData(true);
    } else {
      setPaymentData(false);
    }

  }, [cardNumber, expirationDate, verifyingDigit]);

  useEffect(() => {
    setIsLoading(true);

    if (order) {
      const oldItems = JSON.parse(localStorage.getItem("@foodexplorer:order"));
      const dishIds = oldItems.dishes.map(dish => dish.dish_id);

      async function fetchDishes() {
        const response = await api.get(`/payment?dishIds=${dishIds}`);
        setDishes(response.data);
        viewTotalOrder(response.data);
        setIsLoading(false);
      }

      if (dishIds.length === 0) {
        return setIsLoading(false);
      }

      fetchDishes();
    };
  }, []);

  const queryWidth = 1050;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [viewOrder, setViewOrder] = useState(true);
  const [viewPayment, setViewPayment] = useState(true);

  function handleOpenPayment() {
    setViewOrder(false);
    setViewPayment(true);
  };

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth >= queryWidth) {
      setViewOrder(true);
      setViewPayment(true);
    } else {
      if (viewOrder && viewPayment) {
        setViewOrder(true);
        setViewPayment(false);
      } else if (!viewOrder && viewPayment) {
        setViewOrder(false);
        setViewPayment(true);
      } else {
        setViewOrder(true);
        setViewPayment(false);
      };
    };

  }, [windowWidth]);

  return (
    <Container>
      <Header totalOrder={totalOrder} />
      <Content>
        <BackButton />
        <WrappedPayment>
          {viewOrder && (
            <Order>
              <h2>Meu pedido</h2>
              {items.length > 0 ? (
                items.map(item => (
                  <ItemOrder key={item.id}>
                    <img
                      src={item.image ? `${api.defaults.baseURL}/files/${item.image}` : defaultDish}
                      alt={item.name}
                    />
                    <ItemInformation>
                      <div>
                        <strong>{`${item.amount} x ${item.name}`}</strong>
                        <span>R$ {item.price.toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div onClick={() => deleteItem(item.id)}>Excluir</div>
                    </ItemInformation>
                  </ItemOrder>
                ))
              ) : null}
              {!isLoading && (
                items.length > 0 ? (
                  <Total>
                    <div>Total: R$ {totalOrder.toFixed(2).replace(".", ",")}</div>
                    <Button
                      onClick={handleOpenPayment}
                    >
                      Avançar
                    </Button>
                  </Total>
                ) : null
              )}
              {!isLoading && (
                items.length === 0 ? <p>Nenhum item adicionado.</p> : null
              )}
            </Order>
          )}
          {viewPayment && (
            <PaymentMethods>
              <h2>Pagamento</h2>
              <WrappedPaymentMethods>
                <PaymentTitle>
                  <div
                    className={selectedPayment === 'pix' ? 'active' : ''}
                    onClick={() => handlePaymentSelection('pix')}
                  >
                    <MdPix />PIX
                  </div>
                  <div
                    className={selectedPayment === 'creditcard' ? 'active' : ''}
                    onClick={() => handlePaymentSelection('creditcard')}
                  >
                    <FaRegCreditCard />Crédito
                  </div>
                </PaymentTitle>
                {selectedPayment === 'pix' && (
                  <PaymentType className="pix">
                    <img src={qrcode} alt="QrCode" />
                  </PaymentType>
                )}
                {selectedPayment === 'creditcard' && (
                  <PaymentType className="creditcard">
                    <div>
                      <SectionCreditcard title="Número do Cartão">
                        <input
                          onChange={handleCardNumberChange}
                          placeholder="0000 0000 0000 0000"
                          type="text"
                          id="cardNumber"
                          value={cardNumber}
                          maxLength={19}
                        />
                      </SectionCreditcard>
                    </div>
                    <div>
                      <SectionCreditcard title="Validade">
                        <input
                          placeholder="04/25"
                          type="text"
                          id="expirationDate"
                          value={expirationDate}
                          onChange={handleExpirationDateChange}
                          maxLength={5}
                        />
                      </SectionCreditcard>
                    </div>
                    <div>
                      <SectionCreditcard title="CVC">
                        <input
                          placeholder="000"
                          type="text"
                          id="verifyingDigit"
                          value={verifyingDigit}
                          onChange={handleVerifyingDigitChange}
                          maxLength={3}
                        />
                      </SectionCreditcard>
                    </div>
                    <div>
                      <Button
                        disabled={!paymentData}
                      ><TfiReceipt />Finalizar pagamento</Button>
                    </div>
                  </PaymentType>
                )}
              </WrappedPaymentMethods>
            </PaymentMethods>
          )}
        </WrappedPayment>
      </Content>
      <Footer />
    </Container>
  );
}