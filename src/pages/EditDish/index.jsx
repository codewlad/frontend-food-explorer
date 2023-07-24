import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { FiUpload } from 'react-icons/fi';
import { TfiClose } from 'react-icons/tfi';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DishItem } from '../../components/DishItem';
import defaultDish from '../../../src/assets/dish.svg';

import { ToastContainer, toast } from 'react-toastify';
import { ConfirmationToast } from '../../components/ConfirmationToast';
import 'react-toastify/dist/ReactToastify.css';

import { Container, Content, DishInformations, ChoiceImage, RemoveImage } from './styles';

export function EditDish() {
    const navigate = useNavigate();

    const params = useParams();

    const [dish, setDish] = useState(null);
    const [dishImage, setDishImage] = useState("");
    const [dishImageFile, setDishImageFile] = useState("");
    const [name, setName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [ifHasChanges, setIfHasChanges] = useState(false);
    const [dishImageHasChanges, setDishImageHasChanges] = useState(false);
    const [ingredientsHasChanges, setIngredientsHasChanges] = useState(false);

    const handleCategory = (event) => {
        setSelectedCategory(event.target.value);
    };

    function handleAddIngredient() {
        if (newIngredient.trim() === "") {
            setNewIngredient("");
            return toast("Digite um ingrediente antes de adicionar.");
        };
        setIngredients(prevState => [...prevState, newIngredient]);
        setIngredientsHasChanges(true);
        setNewIngredient("");
    };

    function handleRemoveIngredient(deleted) {
        setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
        setIngredientsHasChanges(true);
    };

    function handleChoiceOfDish(event) {

        const file = event.target.files[0];

        if (file && file.type.startsWith("image/")) {
            setDishImageFile(file);

            const imagePreview = URL.createObjectURL(file);
            setDishImage(imagePreview);

            setDishImageHasChanges(true);
        };
    };

    function removeImage() {
        document.querySelector("#dishImage").value = "";
        if (dish.image) {
            setDishImageHasChanges(true);
        } else {
            setDishImageHasChanges(false);
        };
        setDishImage("");
        setDishImageFile("");
    };

    async function handleRemove() {
        const confirmed = await new Promise((resolve) => {

            const customId = "handleRemove";

            toast(
                <ConfirmationToast
                    message={"Deseja realmente remover o prato?"}
                    confirm={"Remover"}
                    cancel={"Cancelar"}
                    onConfirm={() => resolve(true)}
                    onCancel={() => resolve(false)}
                />, {
                toastId: customId,
                containerId: "await"
            });
        });

        if (confirmed) {
            toast("Prato removido.", { containerId: "autoClose" });
            await api.delete(`/dishes/${params.id}`);
            navigate("/");
        };
    };

    async function handleUpdateDish() {
        try {
            let formattedPrice = price.toString().replace(".", ",");

            const priceRegex = /^\d{1,3},\d{2}$/;
            if (!priceRegex.test(formattedPrice)) {
                return toast("Formato de preço inválido. Insira um valor no formato XX,XX.");
            };

            formattedPrice = parseFloat(formattedPrice.replace(",", "."));

            const fileUploadForm = new FormData();

            if (dishImageFile) {
                fileUploadForm.append("image", dishImageFile);
            };

            fileUploadForm.append("name", name);
            fileUploadForm.append("category", selectedCategory);
            fileUploadForm.append("ingredients", JSON.stringify(ingredients));
            fileUploadForm.append("price", formattedPrice);
            fileUploadForm.append("description", description);
            fileUploadForm.append("removeDishImage", dishImage);

            await api.put(`/dishes/${params.id}`, fileUploadForm);

            toast("Prato atualizado com sucesso!");
            navigate("/");
        } catch (error) {
            console.error("Ocorreu um erro ao atualizar o prato:", error);
            toast("Não foi possível atualizar o prato. Por favor, tente novamente.");
        };
    };

    useEffect(() => {
        if (dish) {
            const replacedPrice = parseFloat(price.toString().replace(',', '.'));

            if (
                dishImageHasChanges ||
                name != dish.name ||
                selectedCategory != dish.category ||
                ingredientsHasChanges ||
                replacedPrice != dish.price ||
                description != dish.description
            ) {
                setIfHasChanges(true);
            } else {
                setIfHasChanges(false);
            };
        };

    }, [dishImageHasChanges, name, selectedCategory, ingredients, price, description]);

    useEffect(() => {
        async function fetchDish() {
            try {
                const response = await api.get(`/dishes/${params.id}`);
                setDish(response.data);

                const foundDish = response.data;
                if (foundDish) {
                    setDish(foundDish);
                    setDishImage(foundDish.image ? `${api.defaults.baseURL}/files/${foundDish.image}` : `${defaultDish}`);
                    setName(foundDish.name);
                    setSelectedCategory(foundDish.category);
                    setIngredients(foundDish.ingredients.map(ingredient => ingredient.name));
                    setPrice(foundDish.price);
                    setDescription(foundDish.description);
                };
            } catch (error) {
                console.error("Ocorreu um erro ao buscar o prato:", error);
                toast("Não foi possível buscar o prato. Por favor, tente novamente.");
            };
        };

        fetchDish();
    }, []);

    return (
        <Container>
            <Header />
            <Content>
                <BackButton />
                <h1>Editar prato</h1>
                {
                    dish &&
                    <DishInformations className='dishInformations'>

                        <Section title="Imagem do prato">
                            <ChoiceImage>
                                {
                                    dishImage &&
                                    <div>
                                        <img src={dishImage} alt="Visualização da imagem" />
                                        <RemoveImage onClick={removeImage}>
                                            <TfiClose />
                                        </RemoveImage>
                                    </div>
                                }
                                <label htmlFor="dishImage">
                                    <FiUpload /> Escolher imagem
                                    <input id="dishImage" type="file" onChange={handleChoiceOfDish} />
                                </label>
                            </ChoiceImage>
                        </Section>

                        <Section title="Nome">
                            <Input
                                placeholder="Ex: Salada Ceasar"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Section>

                        <Section title="Categoria">
                            <select value={selectedCategory} onChange={handleCategory}>
                                <option value="Refeições">Refeições</option>
                                <option value="Sobremesas">Sobremesas</option>
                                <option value="Bebidas">Bebidas</option>
                            </select>
                        </Section>

                        <Section title="Ingredientes">
                            <div>
                                {
                                    ingredients.map((ingredient, index) => (
                                        <DishItem
                                            key={index}
                                            value={ingredient}
                                            onClick={() => handleRemoveIngredient(ingredient)}
                                        />
                                    ))
                                }

                                <DishItem
                                    $isNew
                                    placeholder="Adicionar"
                                    onChange={e => setNewIngredient(e.target.value)}
                                    value={newIngredient}
                                    onClick={handleAddIngredient}
                                />
                            </div>
                        </Section>

                        <Section title="Preço">
                            <Input
                                placeholder="R$ 00,00"
                                value={price.toString().replace('.', ',')}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Section>

                        <Section title="Descrição">
                            <textarea
                                name="dishDescription"
                                id="dishDescription"
                                placeholder="A Salada César é uma opção refrescante para o verão."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </Section>

                        <div>
                            <Button
                                onClick={handleRemove}
                            >Excluir prato
                            </Button>
                            <Button
                                type="text"
                                disabled={!ifHasChanges}
                                onClick={handleUpdateDish}
                            > Salvar alterações
                            </Button>
                        </div>
                    </DishInformations>
                }
            </Content>
            <Footer />
            <ToastContainer enableMultiContainer containerId={"await"} autoClose={false} />
            <ToastContainer enableMultiContainer containerId={"autoClose"} autoClose={1500} />
        </Container>
    );
}