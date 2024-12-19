import { CardItem } from '../carditem/CardItem';
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "../../../store/hook";
import { Link } from "react-router-dom";
import { Flex, Pagination } from '@mantine/core';
import '@mantine/core/styles.css';
import { fetchProducts } from '../../../store/cardsSlice';


const CardList: React.FC = () => {
    const cards = useAppSelector((state) => state.cards.list);    
    console.log(cards);

    const dispatch = useAppDispatch();

    const [limit] = useState<number>(0); 
    const [skip] = useState<number>(0); 

    const [page, setPage] = useState<number>(1);
    const [limitCard] = useState<number>(12)
    
    useEffect(() => {
        dispatch(fetchProducts({ limit, skip }) as any);
    }, [limit, skip, dispatch]);

    const lastCardIndex = page * limitCard
    const firstCardIndex = lastCardIndex - limitCard
    const currentCard = cards.slice(firstCardIndex, lastCardIndex)

    return (
        <>
            <Flex
                mih={50}
                m={40}
                gap="md"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                {currentCard.map((card) => (
                    <Link className="card" key={card.id} to={`/${card.id}`}>
                        <CardItem 
                            id={card.id}
                            thumbnail={card.thumbnail} 
                            discountPercentage={card.discountPercentage}
                            title={card.title}
                            price={card.price}
                            brand={card.brand}
                        />
                    </Link>
                ))}
            </Flex>

            <Flex mb={40} justify="center" align="center">
                <Pagination
                    total={Math.ceil(cards.length / limit)}  
                    value={page}
                    onChange={setPage}
                    color="red"
                    radius="xl"
                    mb="xs"
                    mt="xl"
                    boundaries={2}
                />
            </Flex>
        </>
    );
};

export { CardList };
