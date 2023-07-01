import { Link, useNavigate } from 'react-router-dom';
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

export function AddDish() {

  const navigate = useNavigate();

  const [dishImage, setDishImage] = useState("");
  const [dishImageFile, setDishImageFile] = useState("");
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isNotBlankFields, setIsNotBlankFields] = useState(false);

  function handleAddIngredient() {
    if (newIngredient.trim() === "") {
      setNewIngredient("");
      return alert("Digite um ingrediente antes de adicionar.");
    }
    setIngredients(prevState => [...prevState, newIngredient]);
    setNewIngredient("");
  }

  function handleRemoveIngredient(deleted) {
    setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
  }

  const handleCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  function handleChoiceOfDish(event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setDishImageFile(file);

      const imagePreview = URL.createObjectURL(file);
      setDishImage(imagePreview);
    }
  }

  function checkBlankFields() {
    dishImage ? console.log("IMAGEM --> OK") : console.log("IMAGEM --> NÃO OK")
    name ? console.log("NAME --> OK") : console.log("NAME --> NÃO OK")
    selectedCategory ? console.log("CATEGORY --> OK") : console.log("CATEGORY --> NÃO OK")
    ingredients.length > 0 ? console.log("INGREDIENTS --> OK") : console.log("INGREDIENTS --> NÃO OK")
    price ? console.log("PRICE --> OK") : console.log("PRICE --> NÃO OK")
    description ? console.log("DESCRIPTION --> OK") : console.log("DESCRIPTION --> NÃO OK")

    if (name && selectedCategory && ingredients.length > 0 && price && description) {
      setIsNotBlankFields(true);
    } else {
      setIsNotBlankFields(false);
    }

    console.log(`isNotBlankFields --> ${isNotBlankFields}`);
  }

  async function handleNewDish() {
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

      const response = await api.post("/dishes", fileUploadForm);

      alert("Prato criado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Ocorreu um erro ao criar o prato:", error);
    }
  }

  useEffect(() => {
    checkBlankFields();
  }, [dishImage, name, selectedCategory, ingredients, price, description])

  return (
    <Container>
      <Header />
      <Content>
        <Link to="/"><BackButton /></Link>
        <h1>Adicionar prato</h1>
        <DishInformations className='dishInformations'>
          <Section title="Imagem do prato">
            <ChoiceImage>
              {
                dishImage &&
                <div>
                  <img src={dishImage} alt="Visualização da imagem" />
                  <RemoveImage onClick={() => setDishImage("")}>
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
              placeholder="Ex.: Salada Ceasar"
              onChange={(e) => setName(e.target.value)}
            />
          </Section>

          <Section title="Categoria">
            <select value={selectedCategory} onChange={handleCategory}>
              <option value="">Selecione uma opção</option>
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
              placeholder="00,00"
              onChange={e => setPrice(e.target.value)}
            />
          </Section>

          <Section title="Descrição">
            <textarea
              name="dishDescription"
              id="dishDescription"
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição."
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </Section>

          <div>
            <Button
              type="text"
              disabled={!isNotBlankFields}
              onClick={handleNewDish}
            > Adicionar
            </Button>
          </div>
        </DishInformations>
      </Content>
      <Footer />
    </Container>
  )
}