import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Brand } from '../../components/Brand';
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Main, Form } from './styles';

export function SignUp() {
    const mainRef = useRef(null);
    const containerRef = useRef(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSignUp() {
        if (!name || !email || !password) {
            return alert("Preencha todos os campos.");
        }

        api.post("/users", { name, email, password })
            .then(() => {
                alert("Usuário cadastrado com sucesso!");
                navigate("/");
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Não foi possível cadastrar.");
                }
            });
    }

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
                    <h1>Crie sua conta</h1>

                    <Section title="Seu nome">
                        <Input
                            placeholder="Exemplo: Maria da Silva"
                            onChange={e => setName(e.target.value)}
                        />
                    </Section>

                    <Section title="Email">
                        <Input
                            placeholder="Exemplo: exemplo@email.com.br"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Section>

                    <Section title="Senha">
                        <Input
                            placeholder="No mínimo 6 caracteres"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Section>

                    <Button
                        onClick={handleSignUp}
                    >Criar conta</Button>

                    <Link to="/">Já tenho uma conta</Link>
                </Form>
            </Main>
        </Container>
    );
}