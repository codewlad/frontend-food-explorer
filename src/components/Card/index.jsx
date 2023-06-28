import { TfiPlus, TfiMinus, TfiHeart, TfiPencil } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Button } from '../Button';
import { Container, AmountOfDishes, DishControls, TopRightButton } from './styles';

export function Card({ data }) {
    const { isAdmin } = useAuth();
    return (
        <Container>
            <Link to={`/dish/${data.id}`}>
                <img src={`../../src/assets/${data.image}`} alt={`Imagem de ${data.description.toLowerCase()}`} />
            </Link>
            <Link to={`/dish/${data.id}`}>
                <h3>{data.name} &gt;</h3>
            </Link>
            <p>{data.description}</p>
            <span>{data.price}</span>
            {isAdmin ? (
                <TopRightButton>
                    <Link to={`/edit/${data.id}`}><TfiPencil /></Link>
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