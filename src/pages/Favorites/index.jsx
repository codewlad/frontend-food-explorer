import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import defaultDish from '../../../src/assets/dish.svg';

import { ToastContainer, toast } from 'react-toastify';
import { ConfirmationToast } from '../../components/ConfirmationToast';
import 'react-toastify/dist/ReactToastify.css';

import { Container, Content, WrappedFavorites, FavoriteDish, DishInfo } from './styles';

export function Favorites() {

    const { user } = useAuth();

    const [userFavorites, setUserFavorites] = useState([]);
    const [favoritesUpdated, setFavoritesUpdated] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    function handleDish(id) {
        navigate(`/dish/${id}`)
    };

    async function handleRemove(id) {
        setFavoritesUpdated(false);
        const confirmed = await new Promise((resolve) => {

            const customId = "handleRemove";

            toast(
                <ConfirmationToast
                    message={"Deseja realmente remover dos favoritos?"}
                    confirm={"Remover"}
                    cancel={"Cancelar"}
                    onConfirm={() => resolve(true)}
                    onCancel={() => resolve(false)}
                />, {
                toastId: customId,
                containerId: "await"
            });
        });

        if (confirmed) {
            await api.delete(`/favorites/${id}`);
            setFavoritesUpdated(true);
            toast("Favorito removido.", { containerId: "autoClose" });
        };
    };

    useEffect(() => {
        async function fetchFavorites() {
            const response = await api.get(`/favorites/${user.id}`);
            setUserFavorites(response.data);
            setIsLoading(false);
        };

        if (favoritesUpdated) {
            fetchFavorites();
        };

    }, [favoritesUpdated]);

    return (
        <Container>
            <Header />
            <Content>
                <BackButton />
                <h1>Meus favoritos</h1>
                {userFavorites.length > 0 ? (
                    <WrappedFavorites>
                        {
                            userFavorites.map(favorite => (
                                <FavoriteDish key={favorite.id}>
                                    {
                                        favorite.image ?
                                            <img
                                                src={`${api.defaults.baseURL}/files/${favorite.image}`}
                                                alt={favorite.name}
                                                onClick={() => handleDish(favorite.dish_id)}
                                            /> :
                                            <img src={defaultDish}
                                                alt="Imagem padrão do prato"
                                                onClick={() => handleDish(favorite.dish_id)}
                                            />
                                    }
                                    <DishInfo>
                                        <h2 onClick={() => handleDish(favorite.dish_id)} >{favorite.name}</h2>
                                        <span onClick={() => handleRemove(favorite.id)} >Remover dos favoritos</span>
                                    </DishInfo>
                                </FavoriteDish>
                            ))
                        }
                    </WrappedFavorites>
                ) : null}
                {!isLoading && (
                    userFavorites.length === 0 ? <p>Nenhum favorito adicionado.</p> : null
                )}
            </Content>
            <Footer />
            <ToastContainer enableMultiContainer containerId={"await"} autoClose={false} />
            <ToastContainer enableMultiContainer containerId={"autoClose"} autoClose={1500} />
        </Container>
    );
}