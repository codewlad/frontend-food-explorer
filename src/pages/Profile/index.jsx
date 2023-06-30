import { useState } from 'react';
import { TfiUser, TfiEmail, TfiLock } from 'react-icons/tfi';
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Form, Avatar, ChangeAvatar } from "./styles";

export function Profile() {
    const { user, updateProfile, isAdmin } = useAuth();

    const avatarUrl = `${api.defaults.baseURL}/files/${user.avatar}`;

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();
    const [avatar, setAvatar] = useState(user.avatar);
    const [avatarFile, setAvatarFile] = useState(null);

    async function handleUpdate() {
        const user = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }
        await updateProfile({ user, avatarFile, isAdmin });
    }

    function handleChangeAvatar(event) {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            setAvatarFile(file);

            const imagePreview = URL.createObjectURL(file);
            setAvatar(imagePreview);
        }
    }

    const avatarStyle = {
        backgroundImage: avatar ? avatarFile ? `url(${avatar})` : `url(${avatarUrl})` : 'none'
    };

    return (
        <Container>
            <BackButton />
            <Form>
                <label htmlFor="avatar">
                    <Avatar style={avatarStyle}>
                        {!avatar && <TfiUser />}
                        <ChangeAvatar>Trocar imagem</ChangeAvatar>
                    </Avatar>
                    <input id="avatar" type="file" onChange={handleChangeAvatar} />
                </label>
                <Input
                    icon={TfiUser}
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    icon={TfiEmail}
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    icon={TfiLock}
                    type="password"
                    placeholder="Senha atual"
                    onChange={(e) => setPasswordOld(e.target.value)}
                />
                <Input
                    icon={TfiLock}
                    type="password"
                    placeholder="Nova senha"
                    onChange={(e) => setPasswordNew(e.target.value)}
                />
                <Button onClick={handleUpdate}>Salvar</Button>
            </Form>
        </Container>
    );
}
