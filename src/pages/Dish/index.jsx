import { Link, useParams } from 'react-router-dom';
import { TfiPlus, TfiMinus, TfiReceipt } from 'react-icons/tfi';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { TagIngredients } from '../../components/TagIngredients';
import { Button } from '../../components/Button';
import defaultDish from '../../../src/assets/dish.svg';
import { Container, Content, DishDetails, DishInformation, Ingredients, DishButon, DishControls } from './styles';

export function Dish() {
  const { isAdmin } = useAuth();

  const params = useParams();

  const [dish, setDish] = useState(null);

  useEffect(() => {
    async function fetchDishes() {
      const response = await api.get(`/dishes/${params.id}`);
      setDish(response.data);
    }

    fetchDishes();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <BackButton />
        {
          dish &&
          <DishDetails className='dish'>
            <img
              src={dish.image ? `${api.defaults.baseURL}/files/${dish.image}` : `${defaultDish}`}
              alt={`Imagem de ${dish.description}`} />
            <section>
              <DishInformation className='dishInformation'>
                <h1>{dish.name}</h1>
                <p>{dish.description}</p>
                <Ingredients>
                  {
                    dish.ingredients.length > 0 &&
                    dish.ingredients.map(ingredient => <TagIngredients title={ingredient.name} key={ingredient.id} />)
                  }
                </Ingredients>
                <span>R$ {dish.price}</span>
              </DishInformation>
              {isAdmin ? (
                <DishButon className="dishButon">
                  <Link to={`/edit/${dish.id}`}>
                    <Button>
                      Editar prato
                    </Button>
                  </Link>
                </DishButon>
              ) : (
                <DishButon className="dishButon">
                  <DishControls>
                    <TfiMinus />
                    <span>01</span>
                    <TfiPlus />
                  </DishControls>
                  <Button>
                    <TfiReceipt />incluir ∙ R$ {dish.price}
                  </Button>
                </DishButon>
              )}
            </section>
          </DishDetails>
        }
      </Content>
      <Footer />
    </Container>
  )
}