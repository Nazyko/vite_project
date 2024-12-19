import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../store/cardsSlice';
import { useAppSelector, useAppDispatch } from '../store/hook';
import { ProductData } from '../types/type';
import { Button, Flex, Text, Badge} from "@mantine/core"
import '@mantine/core/styles.css';


const SinglePage = () => {
  const {id} = useParams();
  const [card, setCard] = useState<ProductData | undefined>(undefined);
  const products = useAppSelector((state)=> state.cards.list)
  const dispatch = useAppDispatch();

  const [limit] = useState<number>(0); 
  const [skip] = useState<number>(0);

  useEffect(() => {
    if(!products.length){
      dispatch(fetchProducts({ limit, skip}) as any);
    }
  }, [limit, skip, dispatch, products.length]); 


  useEffect(()=> {
    if (products.length > 0) {
      const foundCard = products.find((product) => product.id === Number(id));
      setCard(foundCard);
    }
  }, [id, products])
  

  return (
    <div>
      { card ? (
        <Flex w='100%' direction='column' align='center' justify='center'>
          <Flex w='60rem' mb={100} gap={40} mt={40} p={10} align='center' justify='center' >
            <img width={300} src={card.thumbnail}/>
            <div>
              <div>
                <Text mt={20} tt="capitalize" size='lg' fw={700}>{card.title}</Text>
                <Text mt={20} tt="capitalize" size='lg' fw={500}>Brand: {card.brand}</Text>
                <Text mt={20}>{card.warrantyInformation}</Text>
                <Text w={500} mt={20}>{card.description}</Text>
                <Flex align='center' gap={20} mt={20} mb={20}>
                  <Text>${card.price}</Text>
                  <Badge size='lg' color="red">-{card.discountPercentage}%</Badge>
                </Flex>
              </div>
              <Button variant="filled" color="red" mr={20}>Buy</Button>
              <Button>Basket</Button>
            </div>
          </Flex>
        </Flex>
      ) : (
        <Text ta='center' mt={40} fw={500} size="lg">
          Product not found.  
        </Text>
      )}
    </div>
  )
}

export default SinglePage

