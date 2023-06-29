import { Link, useNavigate, useParams } from 'react-router-dom';
import { TfiPlus, TfiMinus, TfiReceipt } from 'react-icons/tfi';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { TagIngredients } from '../../components/TagIngredients';
import { Button } from '../../components/Button';
import { Container, Content, DishDetails, DishInformation, Ingredients, DishButon, DishControls } from './styles';

export function Dish() {
  const { isAdmin } = useAuth();

  const [data, setData] = useState(null);

  const params = useParams();

  useEffect(() => {
    async function fetchDish() {
      const response = await api.get(`/dishes/${params.id}`);
      setData(response.data);
    }

    fetchDish()
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <BackButton />
        {
          data &&
          <DishDetails className='dish'>
            <img src={`../../src/assets/image.png`} alt={`Imagem de ${data.description}`} />
            <section>
              <DishInformation className='dishInformation'>
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                <Ingredients>
                  {
                    data.ingredients.length > 0 &&
                    data.ingredients.map(ingredient => <TagIngredients title={ingredient.name} key={ingredient.id} />)
                  }
                </Ingredients>
              </DishInformation>
              {isAdmin ? (
                <DishButon className="dishButon">
                  <Link to={`/edit/${data.id}`}>
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
                    <TfiReceipt />incluir ∙ R$ {data.price}
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