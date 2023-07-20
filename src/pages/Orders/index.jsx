import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import React, { useEffect, useState, useContext } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { CardOrder } from '../../components/CardOrder';
import { Container, Content, OrderAdmin, Order, Status, OrderId, Items, Date, WrappedOrder } from './styles';

export function Orders() {

  const { user, isAdmin } = useAuth();

  const [orders, setOrders] = useState([]);

  const queryWidth = 1050;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth >= queryWidth);

  function handleResize() {
    setWindowWidth(window.innerWidth >= queryWidth)
  };

  useEffect(() => {
    async function fetchOrders() {
      if (isAdmin) {
        const response = await api.get("/orders");
        setOrders(response.data);
      } else {
        const response = await api.get(`/orders/${user.id}`);
        setOrders(response.data);
      }
    }

    fetchOrders();

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <BackButton />
        <h1>Histórico de pedidos</h1>
        <WrappedOrder>
          {
            windowWidth &&
            (
              isAdmin ? (
                <OrderAdmin>
                  <Status><strong>Status</strong></Status>
                  <OrderId><strong>Código</strong></OrderId>
                  <Items><strong>Detalhamento</strong></Items>
                  <Date><strong>Data e hora</strong></Date>
                </OrderAdmin>
              ) : (
                <Order>
                  <Status><strong>Status</strong></Status>
                  <OrderId><strong>Código</strong></OrderId>
                  <Items><strong>Detalhamento</strong></Items>
                  <Date><strong>Data e hora</strong></Date>
                </Order>
              )
            )
          }
          {
            orders.map(order =>
              <CardOrder data={order} key={order.id} />
            )
          }
        </WrappedOrder>
      </Content>
      <Footer />
    </Container>
  )
}