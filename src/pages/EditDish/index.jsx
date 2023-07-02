import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import { TfiClose } from 'react-icons/tfi';
import { api } from '../../services/api';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BackButton } from '../../components/BackButton';
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DishItem } from '../../components/DishItem';
import { Container, Content, DishInformations, ChoiceImage, RemoveImage } from './styles';
import defaultDish from '../../../src/assets/dish.svg';

export function EditDish() {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id
  const [response, setResponse] = useState({});
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
      return alert("Digite um ingrediente antes de adicionar.");
    }
    setIngredients(prevState => [...prevState, newIngredient]);
    setIngredientsHasChanges(true)
    setNewIngredient("");
  };

  function handleRemoveIngredient(deleted) {
    setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
    setIngredientsHasChanges(true)
  };

  function handleChoiceOfDish(event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setDishImageFile(file);

      const imagePreview = URL.createObjectURL(file);
      setDishImage(imagePreview);
      setDishImageHasChanges(true);
    }
  };

  function removeImage() {
    setDishImage("");
    setDishImageHasChanges(true);
  };

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover o prato?");

    if (confirm) {
      await api.delete(`/dishes/${id}`);
      navigate("/");
    }
  };

  async function handleUpdateDish() {
    try {
      const fileUploadForm = new FormData();

      if (dishImageFile) {
        fileUploadForm.append("image", dishImageFile);
      }

      fileUploadForm.append("name", name);
      fileUploadForm.append("category", selectedCategory);
      fileUploadForm.append("ingredients", JSON.stringify(ingredients));
      fileUploadForm.append("price", price);
      fileUploadForm.append("description", description);
      fileUploadForm.append("removeDishImage", dishImage);

      await api.put(`/dishes/${id}`, fileUploadForm);

      alert("Prato atualizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Ocorreu um erro ao atualizar o prato:", error);
    }
  };

  useEffect(() => {
    async function fetchDish() {
      const response = await api.get(`/dishes/${id}`);
      setResponse(response.data);
      setDishImage(response.data.image ? `${api.defaults.baseURL}/files/${response.data.image}` : `${defaultDish}`)
      setName(response.data.name);
      setSelectedCategory(response.data.category);
      setIngredients(response.data.ingredients.map(ingredient => ingredient.name));
      setPrice(response.data.price);
      setDescription(response.data.description);
    }

    fetchDish()
  }, []);

  useEffect(() => {
    if (
      dishImageHasChanges ||
      name != response.name ||
      selectedCategory != response.category ||
      ingredientsHasChanges ||
      price != response.price ||
      description != response.description
    ) {
      setIfHasChanges(true);
    } else {
      setIfHasChanges(false);
    }

  }, [dishImageHasChanges, name, selectedCategory, ingredients, price, description]);

  return (
    <Container>
      <Header />
      <Content>
        <BackButton />
        <h1>Editar prato</h1>
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
                <FiUpload /> Selecione imagem
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
              value={price}
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
      </Content>
      <Footer />
    </Container>
  )
}