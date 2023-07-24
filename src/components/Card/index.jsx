import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

import { ThemeContext } from 'styled-components';
import { TfiPlus, TfiMinus, TfiPencil } from 'react-icons/tfi';
import { VscHeartFilled, VscHeart } from 'react-icons/vsc';

import { Button } from '../Button';
import defaultDish from '../../../src/assets/dish.svg';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, AmountOfDishes, DishControls, TopRightButton } from './styles';

export function Card({ data, setFavoritesUpdated, setDishToAdd }) {
    const { user, isAdmin } = useAuth();

    const navigate = useNavigate();

    const theme = useContext(ThemeContext);

    const dish = data[0];
    const favorites = data[1];

    const dishImage = dish.image ? `${api.defaults.baseURL}/files/${dish.image}` : `${defaultDish}`;

    const [dishAmount, setDishAmount] = useState(1);

    function handleDish(id) {
        navigate(`/dish/${id}`)
    };

    function handleEditDish(id) {
        navigate(`/edit/${id}`)
    };

    function decrease() {
        if (dishAmount > 1) {
            setDishAmount(prevState => prevState - 1);
        };
    };

    function increase() {
        setDishAmount(prevState => prevState + 1);
    };

    function isFavorite(userFavorites, dish_id) {
        for (let i = 0; i < userFavorites.length; i++) {
            if (userFavorites[i] === dish_id) {
                return true;
            };
        };
        return false;
    };

    async function changeFavorite() {
        const data = {
            user_id: user.id,
            dish_id: dish.id
        };

        try {
            const response = await api.post("/favorites", data);

            setFavoritesUpdated(favorites);

            if (response.data.favorite) {
                toast("Adicionado aos favoritos.");
            } else {
                toast("Removido dos favoritos.");
            };
        } catch (error) {
            console.error("Erro ao processar a requisição:", error);
            toast("Erro ao processar a requisição. Por favor, tente novamente.");
        };
    };

    function handleAddDish(dish_id, amount) {
        setDishToAdd({ dish_id, amount });
    };

    return (
        <Container>
            <img
                src={dishImage}
                alt={`Imagem de ${dish.description.toLowerCase()}`}
                onClick={() => handleDish(dish.id)}
            />
            <h3
                onClick={() => handleDish(dish.id)}
            >{dish.name} &gt;</h3>
            <p>{dish.description}</p>
            <span>R$ {dish.price.toFixed(2).replace(".", ",")}</span>
            {isAdmin ? (
                <TopRightButton>
                    <TfiPencil onClick={() => handleEditDish(dish.id)} />
                </TopRightButton>
            ) : (
                <div>
                    <AmountOfDishes>
                        <DishControls>
                            <TfiMinus onClick={decrease} />
                            <span>{dishAmount}</span>
                            <TfiPlus onClick={increase} />
                        </DishControls>
                        <Button onClick={() => handleAddDish(dish.id, dishAmount)}>
                            incluir
                        </Button>
                    </AmountOfDishes>
                    <TopRightButton onClick={() => changeFavorite()}>
                        {
                            isFavorite(favorites, dish.id) ?
                                <VscHeartFilled style={{ color: theme.COLORS.TOMATO_100 }} /> :
                                <VscHeart />
                        }
                    </TopRightButton>
                </div>
            )}
            <ToastContainer autoClose={1500} />
        </Container>
    );
}