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
import { Container, Content, WrappedPayment, Order, ItemOrder, ItemInformation, PaymentMethods, WrappedPaymentMethods, PaymentTitle, PaymentType } from './styles';

export function Payment() {

  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('pix');

  const handlePaymentSelection = (payment) => {
    setSelectedPayment(payment);
  };

  useEffect(() => {

    async function fetchOrder() {
      const response = await api.get(`/orders/${user.id}`);
      console.log(response.data);
      setItems(response.data.dishes);
    }

    fetchOrder();

  }, []);

  useEffect(() => {


  }, [selectedPayment])

  return (
    <Container>
      <Header />
      <Content>
        <BackButton />
        <WrappedPayment>
          <Order>
            <h2>Meu pedido</h2>
            {
              items.map(item => (
                <ItemOrder key={item.dish_id}>
                  <img src={
                    item.image ? `${api.defaults.baseURL}/files/${item.image}` : `${defaultDish}`
                  } alt={item.name} />
                  <ItemInformation>
                    <div>
                      <strong>{`${item.amount} x ${item.name}`}</strong>
                      <span>R$ {item.total.toString().replace(".", ",")}</span>
                    </div>
                    <div>
                      Excluir
                    </div>
                  </ItemInformation>
                </ItemOrder>
              ))
            }
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
  )
}