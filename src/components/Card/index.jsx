import { Container } from './styles';
import { Button } from '../Button';
import { TfiPlus, TfiMinus, TfiHeart, TfiPencil } from 'react-icons/tfi';

export function Card({ data }) {
    const isAdmin = false;
    return (
        <Container>
            <img src={`../../src/assets/${data.image}`} alt={`Imagem de ${data.description.toLowerCase()}`} />
            <h2>{data.name} &gt;</h2>
            <p>{data.description}</p>
            <span>{data.price}</span>
            {isAdmin ? (
                <div className="topRightButton">
                    <TfiPencil />
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