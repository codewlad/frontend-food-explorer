import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import { api } from '../../services/api';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DishItem } from '../../components/DishItem';
import { Container, Content, DishInformations } from './styles';

export function EditDish() {
  const params = useParams();

  const id = params.id
  const [dishName, setDishName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  function handleAddIngredient() {
    if (newIngredient.trim() === "") {
      setNewIngredient("");
      return alert("Digite um ingrediente antes de adicionar.");
    }
    setIngredients(prevState => [...prevState, newIngredient]);
    setNewIngredient("");
  }

  function handleRemoveIngredient(deleted) {
    setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
  }

  useEffect(() => {
    async function fetchDish() {
      const response = await api.get(`/dishes/${id}`);
      setDishName(response.data.name);
      setSelectedCategory(response.data.category);
      setIngredients(response.data.ingredients.map(ingredient => ingredient.name));
      setPrice(response.data.price);
      setDescription(response.data.description);
    }

    fetchDish()
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <BackButton />
        <h1>Editar prato</h1>
        <DishInformations className='dishInformations'>

          <Section title="Imagem do prato">
            <button>
              <FiUpload /> Selecione imagem
            </button>
          </Section>

          <Section title="Nome">
            <Input
              placeholder="Ex: Salada Ceasar"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
            />
          </Section>

          <Section title="Categoria">
            <select value={selectedCategory} onChange={handleCategory}>
              <option value="Refeições">Refeições</option>
              <option value="Sobremesas">Sobremesas</option>
              <option value="Bebidas">Bebidas</option>
            </select>
          </Section>

          <Section title="Ingredientes">
            <div>
              {
                ingredients.map((ingredient, index) => (
                  <DishItem
                    key={index}
                    value={ingredient}
                    onClick={() => handleRemoveIngredient(ingredient)}
                  />
                ))
              }

              <DishItem
                $isNew
                placeholder="Adicionar"
                onChange={e => setNewIngredient(e.target.value)}
                value={newIngredient}
                onClick={handleAddIngredient}
              />
            </div>
          </Section>

          <Section title="Preço">
            <Input
              placeholder="R$ 00,00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Section>

          <Section title="Descrição">
            <textarea
              name="dishDescription"
              id="dishDescription"
              placeholder="A Salada César é uma opção refrescante para o verão."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </Section>

          <div>
            <Button>
              Excluir prato
            </Button>
            <Button>
              Salvar alterações
            </Button>
          </div>
        </DishInformations>
      </Content>
      <Footer />
    </Container>
  )
}