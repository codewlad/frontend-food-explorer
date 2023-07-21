import { useEffect, useRef, useState } from 'react';
import { BsHexagonFill } from 'react-icons/bs'
import { api } from '../../services/api';
import { Brand } from '../../components/Brand';
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Welcome, WelcomeMessage, Triangle, Main, Logo, Form } from './styles';

export function AdminRegister() {
    const mainRef = useRef(null);
    const containerRef = useRef(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [welcome, setWelcome] = useState(true);

    function showSignUp() {
        setWelcome(false);
    };

    function handleSignUp() {
        if (!name || !email || !password) {
            return alert("Preencha todos os campos.");
        };

        if (password.length < 6) {
            return alert("A senha deve ter no mínimo 6 caracteres.");
        };

        api.post("/admin", { name, email, password })
            .then(() => {
                alert("Administrador cadastrado com sucesso!");
                window.location.reload();
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Não foi possível cadastrar.");
                }
            });
    };

    useEffect(() => {
        function handleResize() {
            const containerHeight = mainRef.current.offsetHeight;
            const windowHeight = window.innerHeight;

            if (containerHeight > windowHeight) {
                containerRef.current.style.height = 'auto';
            } else {
                containerRef.current.style.height = '100%';
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Container ref={containerRef}>
            <Main ref={mainRef}>
                <Logo>
                    <BsHexagonFill />
                    food explorer
                </Logo>
                {
                    welcome &&
                    <Welcome>
                        <WelcomeMessage>
                            <p>Olá! Seja bem vindo(a) ao Food Explorer, o seu aplicativo de gerenciamento de restaurante online!</p>
                            <p>Para o primeiro acesso, precisamos criar uma conta de administrador. Você está pronto?</p>
                            <p>Fica tranquilo que é bem fácil! É só clicar no botão "continuar" aqui em baixo e cadastrar alguns dados.</p>
                            <div>
                                <Button onClick={showSignUp}>Continuar</Button>
                            </div>
                        </WelcomeMessage>
                        <Triangle />
                        <BsHexagonFill size={40} />
                    </Welcome>
                }
                {
                    !welcome &&
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
                                type="password"
                                placeholder="No mínimo 6 caracteres"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Section>

                        <Button
                            onClick={handleSignUp}
                        >Criar conta de adminstrador</Button>
                    </Form>
                }
            </Main>
        </Container>
    );
}