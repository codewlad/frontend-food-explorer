import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { useAuth } from '../../hooks/auth';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { MdPix } from "react-icons/md";
import { FaRegCreditCard } from 'react-icons/fa';
import defaultDish from '../../../src/assets/dish.svg';
import qrcode from '../../../src/assets/qrcode.jpg';
import { Container, Content, WrappedPayment, Order, Total, ItemOrder, ItemInformation, PaymentMethods, WrappedPaymentMethods, PaymentTitle, PaymentType } from './styles';

export function Payment() {
  const { user, order } = useAuth();

  const [selectedPayment, setSelectedPayment] = useState('pix');
  const [items, setItems] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePaymentSelection = (payment) => {
    setSelectedPayment(payment);
  };

  function viewOrder(orderDishes) {
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
    viewOrder(dishes);
  }

  useEffect(() => {
    setIsLoading(true);

    if (order) {
      const oldItems = JSON.parse(localStorage.getItem("@foodexplorer:order"));
      const dishIds = oldItems.dishes.map(dish => dish.dish_id);

      async function fetchDishes() {
        const response = await api.get(`/payment?dishIds=${dishIds}`);
        setDishes(response.data);
        viewOrder(response.data);
        setIsLoading(false);
      }

      if (dishIds.length === 0) {
        return setIsLoading(false);
      }

      fetchDishes();
    }
  }, []);

  useEffect(() => {

  }, [selectedPayment]);

  return (
    <Container>
      <Header totalOrder={totalOrder} />
      <Content>
        <BackButton />
        <WrappedPayment>
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
              items.length > 0 ? <Total>Total: R$ {totalOrder.toFixed(2).replace(".", ",")}</Total> : null
            )}
            {!isLoading && (
              items.length === 0 ? <p>Nenhum item adicionado.</p> : null
            )}
          </Order>
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
                  credit
                </PaymentType>
              )}
            </WrappedPaymentMethods>
          </PaymentMethods>
        </WrappedPayment>
      </Content>
      <Footer />
    </Container>
  );
}