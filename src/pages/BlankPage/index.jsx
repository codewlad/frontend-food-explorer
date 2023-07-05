import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Content } from './styles';

export function BlankPage() {
  return (
    <Container>
      <Header />
      <Content>
      </Content>
      <Footer />
    </Container>
  )
}