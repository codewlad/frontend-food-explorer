import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    async function signIn({ email, password }) {
        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token, isAdmin } = response.data;
            let order = {};

            localStorage.setItem("@foodexplorer:user", JSON.stringify(user));
            localStorage.setItem("@foodexplorer:token", token);

            if (!isAdmin) {
                const storageOrder = JSON.parse(localStorage.getItem("@foodexplorer:order"));

                if (storageOrder && storageOrder.user_id === user.id) {
                    order = storageOrder;
                    console.log("pedido mantido");
                } else {
                    order = {
                        user_id: user.id,
                        status: "aberto",
                        dishes: []
                    };

                    localStorage.setItem("@foodexplorer:order", JSON.stringify(order));
                };
            };

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({ user, token, isAdmin, order });

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível entrar.");
            }
        }
    }


    function signOut() {
        localStorage.removeItem("@foodexplorer:token");
        localStorage.removeItem("@foodexplorer:user");

        setData({});
    }

    async function updateProfile({ user, avatarFile, isAdmin }) {
        try {

            if (avatarFile) {
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile);

                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar;
            }

            await api.put("/users", user);
            localStorage.setItem("@foodexplorer:user", JSON.stringify(user));

            setData({ user, token: data.token, isAdmin });
            alert("Perfil atualizado!");

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível atualizar o perfil.");
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("@foodexplorer:token");
        const user = localStorage.getItem("@foodexplorer:user");
        const order = localStorage.getItem("@foodexplorer:order");

        if (token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const decodedToken = jwt_decode(token);
            const isAdmin = decodedToken.isAdmin;

            setData({
                token,
                user: JSON.parse(user),
                isAdmin,
                order: JSON.parse(order)
            });
        }

    }, []);

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            updateProfile,
            user: data.user,
            isAdmin: data.isAdmin,
            order: data.order
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };