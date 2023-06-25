import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DishItem } from '../../components/DishItem';
import { Container, Content, DishInformations } from './styles';

export function AddDish() {

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Container>
      <Header />
      <Content>
        <Link to="/"><BackButton /></Link>
        <h1>Adicionar prato</h1>
        <DishInformations className='dishInformations'>

          <Section title="Imagem do prato">
            <button>
              <FiUpload /> Selecione imagem
            </button>
          </Section>

          <Section title="Nome">
            <Input placeholder="Ex.: Salada Ceasar" />
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
              <DishItem value="pão" />
              <DishItem $isNew placeholder="Adicionar" />
            </div>
          </Section>

          <Section title="Preço">
            <Input placeholder="R$ 00,00" />
          </Section>

          <Section title="Descrição">
            <textarea name="dishDescription" id="dishDescription" placeholder="Fale brevemente sobre o prato, seus ingredientes e composição."></textarea>
          </Section>

          <div>
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