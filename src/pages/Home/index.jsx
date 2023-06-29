import { useState, useEffect } from 'react';
import { api } from '../../services/api'
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Carousel } from '../../components/Carousel';
import { Footer } from '../../components/Footer';
import { Container, Content, Banner, WrappedBanner, Slogan, BgBanner } from './styles';

export function Home() {

  const [dishes, setDishes] = useState([]);
  const [meals, setMeals] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [name, setName] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchDishes() {
      const response = await api.get(`/dishes?name=${name}&ingredients=${ingredients}`);
      const { data } = response;

      const mealsArray = data.filter(dish => dish.category === 'Refeições');
      const dessertsArray = data.filter(dish => dish.category === 'Sobremesas');
      const drinksArray = data.filter(dish => dish.category === 'Bebidas');

      setMeals(mealsArray.map(meal => <Card key={meal.id} data={meal} />));
      setDesserts(dessertsArray.map(dessert => <Card key={dessert.id} data={dessert} />));
      setDrinks(drinksArray.map(drink => <Card key={drink.id} data={drink} />));
    }

    fetchDishes()
  }, [])

  return (
    <Container>
      <Header />
      <Content>
        <Banner className="banner">
          <WrappedBanner className="wrappedBanner" />
          <Slogan className="slogan">
            <h1>Sabores inigualáveis</h1>
            <span>Sinta o cuidado do preparo com ingredientes selecionados</span>
          </Slogan>
          <BgBanner className="bgBanner" />
        </Banner>
        {
          meals.length > 0 &&
          <Carousel title="Refeições" content={meals} />
        }
        {
          desserts.length > 0 &&
          <Carousel title="Sobremesas" content={desserts} />
        }
        {
          drinks.length > 0 &&
          <Carousel title="Bebidas" content={drinks} />
        }
      </Content>
      <Footer />
    </Container>
  )
}