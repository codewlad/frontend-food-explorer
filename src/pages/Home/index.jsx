import { Header } from '../../components/Header';
import { Container } from './styles';
import { Content } from './styles';
import { Card } from '../../components/Card';
import { Carousel } from '../../components/Carousel';
import { Footer } from '../../components/Footer';

export function Home() {

  const meals = [
    { id: 1, image: "image.png", name: "Spaguetti Gambe", description: "Massa fresca com camarões e pesto.", price: 79.97 },
    { id: 2, image: "image.png", name: "Spaguetti Gambe", description: "Massa fresca com camarões e pesto.", price: 79.97 },
    { id: 3, image: "image.png", name: "Spaguetti Gambe", description: "Massa fresca com camarões e pesto.", price: 79.97 },
    { id: 4, image: "image.png", name: "Spaguetti Gambe", description: "Massa fresca com camarões e pesto.", price: 79.97 },
  ];

  const desserts = [
    { id: 1, image: "image.png", name: "Spaguetti Gambe", description: "Massa fresca com camarões e pesto.", price: 79.97 },
    { id: 2, image: "image.png", name: "Spaguetti Gambe", description: "Massa fresca com camarões e pesto.", price: 79.97 },
    { id: 3, image: "image.png", name: "Spaguetti Gambe", description: "Massa fresca com camarões e pesto.", price: 79.97 },
    { id: 4, image: "image.png", name: "Spaguetti Gambe", description: "Massa fresca com camarões e pesto.", price: 79.97 },
    { id: 5, image: "image.png", name: "Spaguetti Gambe", description: "Massa fresca com camarões e pesto.", price: 79.97 },
  ];

  const mealsContent = meals.map(meal => <Card key={meal.id} data={meal} />);
  const dessertsContent = desserts.map(dessert => <Card key={dessert.id} data={dessert} />);

  return (
    <Container>
      <Header />
      <Content>
        <div className="banner">
          <div className="wrappedBanner"></div>
          <div className="slogan">
            <h1>Sabores inigualáveis</h1>
            <span>Sinta o cuidado do preparo com ingredientes selecionados</span>
          </div>
          <div className="bgBanner"></div>
        </div>
        <Carousel title="Refeições" content={mealsContent} />
        <Carousel title="Sobremesas" content={dessertsContent} />
      </Content>
      <Footer />
    </Container>
  )
}