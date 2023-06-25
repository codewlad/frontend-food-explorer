import { Link } from 'react-router-dom';
import { TfiPlus, TfiMinus, TfiReceipt } from 'react-icons/tfi';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { TagIngredients } from '../../components/TagIngredients';
import { Button } from '../../components/Button';
import { Container, Content, DishDetails, DishInformation, TagsIngredients, DishButon, DishControls } from './styles';

export function Dish() {
  const isAdmin = false;

  const dish = {
    id: 1,
    image: "image2.png",
    name: "Salada Ravanello",
    description: "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
    price: 999.99,
    ingredients: [
      "alface",
      "cebola",
      "pão naan",
      "pepino",
      "rabanete",
      "tomate"
    ]
  };

  return (
    <Container>
      <Header />
      <Content>
        <Link to="/"><BackButton /></Link>
        <DishDetails className='dish'>
          <img src={`../../src/assets/${dish.image}`} alt={`Imagem de ${dish.description.toLowerCase()}`} />
          <section>
            <DishInformation className='dishInformation'>
              <h1>{dish.name}</h1>
              <p>{dish.description}</p>
              <TagsIngredients className="tagsIngredients">
                {dish.ingredients.map((ingredient, index) => <TagIngredients title={ingredient} key={index} />)}
              </TagsIngredients>
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
      </Content>
      <Footer />
    </Container>
  )
}