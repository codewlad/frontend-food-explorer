import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Brand } from '../../components/Brand';
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Main, Form } from './styles';

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useAuth();

    const mainRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleResize() {
            const containerHeight = mainRef.current.offsetHeight;
            const windowHeight = window.innerHeight;

            if (containerHeight > windowHeight) {
                containerRef.current.style.height = 'auto';
            } else {
                containerRef.current.style.height = '100%';
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function handleSignIn() {
        signIn({ email, password })
    }

    return (
        <Container ref={containerRef}>
            <Main ref={mainRef}>
                <Brand />
                <Form>
                    <h1>Faça o login</h1>

                    <Section title="Email">
                        <Input
                            type="text"
                            placeholder="Exemplo: exemplo@email.com.br"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Section>

                    <Section title="Senha">
                        <Input
                            type="password"
                            placeholder="No mínimo 6 caracteres"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Section>

                    <Button
                        onClick={handleSignIn}
                    >
                        Entrar
                    </Button>

                    <Link to="/register">Criar uma conta</Link>
                </Form>
            </Main>
        </Container>
    );
}