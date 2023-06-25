import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '../../components/Brand';
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Main, Form } from './styles';

export function SignIn() {
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

    return (
        <Container ref={containerRef}>
            <Main ref={mainRef}>
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
            </Main>
        </Container>
    );
}