import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../../components/Header';
import { Container } from './styles';
import { Content } from './styles';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { FiUpload } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { DishItem } from '../../components/DishItem';

export function EditDish() {
  const dish_id = 1;
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Container>
      <Header />
      <Content>
        <Link to={`/dish/${dish_id}`}><BackButton /></Link>
        <h1>Editar prato</h1>
        <div className='dishInformations'>

          <Section title="Imagem do prato">
            <button>
              <FiUpload /> Selecione imagem
            </button>
          </Section>

          <Section title="Nome">
            <Input placeholder="Salada Ceasar" />
          </Section>

          <Section title="Categoria">
            <select value={selectedCategory} onChange={handleCategory}>
              <option value="">Selecione uma opção</option>
              <option value="meals">Refeições</option>
              <option value="desserts">Sobremesas</option>
              <option value="drinks">Bebidas</option>
            </select>
          </Section>

          <Section title="Ingredientes">
            <div>
              <DishItem value="Pão" />
              <DishItem $isNew placeholder="Adicionar" />
            </div>
          </Section>

          <Section title="Preço">
            <Input placeholder="R$ 00,00" />
          </Section>

          <Section title="Descrição">
            <textarea name="dishDescription" id="dishDescription" placeholder="A Salada César é uma opção refrescante para o verão."></textarea>
          </Section>

          <div>
            <Button>
              Excluir prato
            </Button>
            <Button>
              Salvar alterações
            </Button>
          </div>
        </div>
      </Content>
      <Footer />
    </Container>
  )
}