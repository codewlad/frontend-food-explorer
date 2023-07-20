import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment/moment';
import { ThemeContext } from 'styled-components';
import { FaCircle } from 'react-icons/fa';
import { Container, Order, Status, OrderId, Items, Date, OrderAdmin, StatusAdmin } from './styles';

export function CardOrder({ data }) {

  const theme = useContext(ThemeContext);

  const { isAdmin } = useAuth();

  const queryWidth = 1050;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth >= queryWidth);

  const [selectedStatus, setSelectedStatus] = useState(data.status);

  function formatDate(dateString) {
    const dateTime = moment(dateString, "DD/MM/YYYY, HH:mm:ss");

    const formattedDate = dateTime.format("DD/MM [às] HH[h]mm");

    return formattedDate;
  }

  async function handleUpdateOrderStatus(status) {
    const confirm = window.confirm("Deseja realmente atualizar o status do pedido?");

    if (confirm) {
      try {
        const response = await api.put(`/orders/${data.id}`, { status });

        if (response.status === 200) {
          setSelectedStatus(status);
          alert('Status atualizado com sucesso!');
        } else {
          alert('Erro ao atualizar o status. Por favor, tente novamente.');
        }
      } catch (error) {
        alert('Ocorreu um erro ao processar a atualização: ' + error.message);
      }
    }
  }

  const handleStatus = (event) => {
    handleUpdateOrderStatus(event.target.value)
  };

  function handleResize() {
    setWindowWidth(window.innerWidth >= queryWidth)
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      {
        isAdmin ? (
          <OrderAdmin>
            <StatusAdmin>
              <div>
                {
                  selectedStatus === "Pendente" &&
                  <FaCircle size={10} style={{ color: theme.COLORS.TOMATO_300 }} />
                }
                {
                  selectedStatus === "Preparando" &&
                  <FaCircle size={10} style={{ color: theme.COLORS.CARROT_100 }} />
                }
                {
                  selectedStatus === "Entregue" &&
                  <FaCircle size={10} style={{ color: theme.COLORS.MINT_100 }} />
                }
                <select value={selectedStatus} onChange={handleStatus}>
                  <option value="Pendente">Pendente</option>
                  <option value="Preparando">Preparando</option>
                  <option value="Entregue">Entregue</option>
                </select>
              </div>
            </StatusAdmin>

            <OrderId>
              {String(data.id).padStart(8, "0")}
            </OrderId>

            <Items>
              {data.dishes.map((dish, index) => (
                <React.Fragment key={index}>
                  {`${dish.amount} x ${dish.name}`}
                  {index !== data.dishes.length - 1 && ", "}
                </React.Fragment>
              ))}
            </Items>

            <Date>
              {formatDate(data.orders_at)}
            </Date>
          </OrderAdmin>
        ) : (
          <Order key={data.id}>
            <Status>
              {
                data.status === "Pendente" &&
                <FaCircle size={10} style={{ color: theme.COLORS.TOMATO_300 }} />
              }
              {
                data.status === "Preparando" &&
                <FaCircle size={10} style={{ color: theme.COLORS.CARROT_100 }} />
              }
              {
                data.status === "Entregue" &&
                <FaCircle size={10} style={{ color: theme.COLORS.MINT_100 }} />
              }
              {data.status}
            </Status>

            <OrderId>
              {String(data.id).padStart(8, "0")}
            </OrderId>

            <Items>
              {data.dishes.map((dish, index) => (
                <React.Fragment key={index}>
                  {`${dish.amount} x ${dish.name}`}
                  {index !== data.dishes.length - 1 && ", "}
                </React.Fragment>
              ))}
            </Items>

            <Date>
              {formatDate(data.orders_at)}
            </Date>
          </Order>
        )
      }
    </Container>
  )
}