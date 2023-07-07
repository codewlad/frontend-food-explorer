import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { Container, Content } from './styles';

export function BlankPage() {
  return (
    <Container>
      <Header />
      <Content>
        <BackButton />
      </Content>
      <Footer />
    </Container>
  )
}