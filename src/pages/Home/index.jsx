import { Header } from '../../components/Header';
import { Container } from './styles';
import { Content } from './styles';


export function Home() {

  return (
    <Container>
      <Header />
      <Content>
        <div className="banner">
          <div className='wrappedBanner'></div>
          <div className="slogan">
            <h1>Sabores inigualáveis</h1>
            <span>Sinta o cuidado do preparo com ingredientes selecionados</span>
          </div>
          <div className="bgBanner"></div>
        </div>
      </Content>
    </Container>
  )
}