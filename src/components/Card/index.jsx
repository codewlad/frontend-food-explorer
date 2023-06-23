import { Link } from 'react-router-dom';
import { Container } from './styles';
import { Button } from '../Button';
import { TfiPlus, TfiMinus, TfiHeart, TfiPencil } from 'react-icons/tfi';

export function Card({ data }) {
    const isAdmin = false;
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
                <div className="topRightButton">
                    <Link to={`/edit/${data.id}`}><TfiPencil /></Link>
                </div>
            ) : (
                <div>
                    <div className="amountOfDishes">
                        <div>
                            <TfiMinus />
                            <span>01</span>
                            <TfiPlus />
                        </div>
                        <Button>
                            incluir
                        </Button>
                    </div>
                    <div className="topRightButton">
                        <TfiHeart />
                    </div>
                </div>
            )}
        </Container>
    )
}