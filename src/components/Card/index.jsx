import { TfiPlus, TfiMinus, TfiHeart, TfiPencil } from 'react-icons/tfi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { Button } from '../Button';
import { Container, AmountOfDishes, DishControls, TopRightButton } from './styles';
import defaultDish from '../../../src/assets/dish.svg';

export function Card({ data }) {
    const { isAdmin } = useAuth();

    const navigate = useNavigate();

    const dishImage = data.image ? `${api.defaults.baseURL}/files/${data.image}` : `${defaultDish}`;

    function handleDish(id) {
        navigate(`/dish/${id}`)
    }

    function handleEditDish(id) {
        navigate(`/edit/${id}`)
    }

    return (
        <Container>
            <img
                src={dishImage}
                alt={`Imagem de ${data.description.toLowerCase()}`}
                onClick={() => handleDish(data.id)}
            />
            <h3
                onClick={() => handleDish(data.id)}
            >{data.name} &gt;</h3>
            <p>{data.description}</p>
            <span>{data.price}</span>
            {isAdmin ? (
                <TopRightButton>
                    <TfiPencil onClick={() => handleEditDish(data.id)} />
                </TopRightButton>
            ) : (
                <div>
                    <AmountOfDishes>
                        <DishControls>
                            <TfiMinus />
                            <span>01</span>
                            <TfiPlus />
                        </DishControls>
                        <Button>
                            incluir
                        </Button>
                    </AmountOfDishes>
                    <TopRightButton>
                        <TfiHeart />
                    </TopRightButton>
                </div>
            )}
        </Container>
    )
}