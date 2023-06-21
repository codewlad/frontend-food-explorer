import { Header } from '../../components/Header';
import { Container } from './styles';
import { Content } from './styles';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { TagIngredients } from '../../components/TagIngredients';
import { TfiPlus, TfiMinus, TfiReceipt } from 'react-icons/tfi';
import { Button } from '../../components/Button';

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
        <BackButton />
        <div className='dish'>
          <img src={`../../src/assets/${dish.image}`} alt={`Imagem de ${dish.description.toLowerCase()}`} />
          <div>
            <div className='dishInformation'>
              <h1>{dish.name}</h1>
              <p>{dish.description}</p>
              <div className="tagsIngredients">
                {dish.ingredients.map((ingredient, index) => <TagIngredients title={ingredient} key={index} />)}
              </div>
            </div>
            {isAdmin ? (
              <div className="dishButon">
                <Button>
                  Editar prato
                </Button>
              </div>
            ) : (
              <div className="dishButon">
                <div>
                  <TfiMinus />
                  <span>01</span>
                  <TfiPlus />
                </div>
                <Button>
                  <TfiReceipt />incluir ∙ R$ {dish.price}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Content>
      <Footer />
    </Container>
  )
}