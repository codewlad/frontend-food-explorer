import { useState, useEffect, createContext } from 'react';
import { api } from '../../services/api'
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Carousel } from '../../components/Carousel';
import { Footer } from '../../components/Footer';
import { Container, Content, Banner, WrappedBanner, Slogan, BgBanner, NoResults } from './styles';

export const searchContext = createContext([]);

export function Home() {

  const [meals, setMeals] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [itemSearch, setItemSearch] = useState("");
  const [dishes, setDishes] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [search, setSearch] = useState("");
  const page = "home";


  useEffect(() => {
    async function fetchDishes() {
      const response = await api.get(`/dishes?itemSearch=${search}`);

      setDishes(response.data);

      const mealsArray = response.data.filter(dish => dish.category === 'Refeições');
      const dessertsArray = response.data.filter(dish => dish.category === 'Sobremesas');
      const drinksArray = response.data.filter(dish => dish.category === 'Bebidas');

      setMeals(mealsArray.map(meal => <Card key={meal.id} data={meal} />));
      setDesserts(dessertsArray.map(dessert => <Card key={dessert.id} data={dessert} />));
      setDrinks(drinksArray.map(drink => <Card key={drink.id} data={drink} />));
    }

    fetchDishes();

  }, [])

  useEffect(() => {
    function filterDishesByNameOrIngredient(searchQuery) {
      searchQuery = searchQuery.toLowerCase();

      var filteredDishes = dishes.filter(function (dish) {
        if (dish.name.toLowerCase().includes(searchQuery)) {
          return true;
        }

        var foundIngredient = dish.ingredients.find(function (ingredient) {
          return ingredient.name.toLowerCase().includes(searchQuery);
        });

        return !!foundIngredient;
      });

      return filteredDishes;
    }

    var searchResult = filterDishesByNameOrIngredient(itemSearch);
    setFilteredSearch(searchResult);

    const mealsArray = searchResult.filter(dish => dish.category === 'Refeições');
    const dessertsArray = searchResult.filter(dish => dish.category === 'Sobremesas');
    const drinksArray = searchResult.filter(dish => dish.category === 'Bebidas');

    setMeals(mealsArray.map(meal => <Card key={meal.id} data={meal} />));
    setDesserts(dessertsArray.map(dessert => <Card key={dessert.id} data={dessert} />));
    setDrinks(drinksArray.map(drink => <Card key={drink.id} data={drink} />));

  }, [itemSearch])

  return (
    <Container>
      <searchContext.Provider value={[itemSearch, setItemSearch, page]}>
        <Header />
      </searchContext.Provider>
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
        {
          meals.length <= 0 && desserts.length <= 0 && drinks.length <= 0 &&
          <NoResults>Nenhum resultado encontrado!</NoResults>
        }
      </Content>
      <Footer />
    </Container>
  )
}