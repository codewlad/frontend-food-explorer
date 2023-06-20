import { Container, Content } from './styles';
import { useRef } from 'react';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';

export function Carousel({ content, title }) {
    const carouselOfDishes = useRef(null);

    const scrollToLeft = () => {
        carouselOfDishes.current.scrollLeft -= 180;
    };

    const scrollToRight = () => {
        carouselOfDishes.current.scrollLeft += 180;
    };

    return (
        <Container>
            <h2>
                {title}
            </h2>
            <Content ref={carouselOfDishes}>
                {content}
            </Content>
            <div className="controlLeft">
                <TfiAngleLeft onClick={scrollToLeft} />
            </div>
            <div className="controlRight">
                <TfiAngleRight onClick={scrollToRight} />
            </div>
            <div className="gradientLeft"></div>
            <div className="gradientRight"></div>
        </Container>
    )
}