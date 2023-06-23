import { Link } from 'react-router-dom';
import { Container, Form } from './styles';
import { Brand } from '../../components/Brand'
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function SignUp() {
    return (
        <Container>
            <Brand />
            <Form>
                <h1>Crie sua conta</h1>

                <Section title="Seu nome">
                    <Input placeholder="Exemplo: Maria da Silva" />
                </Section>

                <Section title="Email">
                    <Input placeholder="Exemplo: exemplo@email.com.br" />
                </Section>

                <Section title="Senha">
                    <Input placeholder="No mínimo 6 caracteres" />
                </Section>

                <Button>
                    Criar conta
                </Button>

                <Link to="/">Já tenho uma conta</Link>
            </Form>
        </Container>
    )
}