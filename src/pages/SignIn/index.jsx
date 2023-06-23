import { Link } from 'react-router-dom';
import { Container, Form } from './styles';
import { Brand } from '../../components/Brand'
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function SignIn() {
    return (
        <Container>
            <Brand />
            <Form>
                <h1>Faça o login</h1>

                <Section title="Email">
                    <Input placeholder="Exemplo: exemplo@email.com.br" />
                </Section>

                <Section title="Senha">
                    <Input placeholder="No mínimo 6 caracteres" />
                </Section>

                <Button>
                    Entrar
                </Button>

                <Link to="/register">Criar uma conta</Link>
            </Form>
        </Container>
    )
}