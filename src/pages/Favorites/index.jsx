import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { BackButton } from '../../components/BackButton';
import defaultDish from '../../../src/assets/dish.svg';
import { Container, Content, WrappedFavorites, FavoriteDish, DishInfo } from './styles';

export function Favorites() {

  const { user } = useAuth();

  const [userFavorites, setUserFavorites] = useState([]);
  const [favoritesUpdated, setFavoritesUpdates] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  function handleDish(id) {
    navigate(`/dish/${id}`)
  }

  async function handleRemove(id) {
    const confirm = window.confirm("Deseja realmente remover dos favoritos?");

    if (confirm) {
      await api.delete(`/favorites/${id}`);
      setFavoritesUpdates(true);
    }
  };

  useEffect(() => {
    async function fetchFavorites() {
      const response = await api.get(`/favorites/${user.id}`);
      setUserFavorites(response.data);
      setIsLoading(false);
    }

    fetchFavorites();

  }, [favoritesUpdated])

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
    </Container>
  )
}