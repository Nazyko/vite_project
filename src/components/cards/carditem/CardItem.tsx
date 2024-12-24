import { Badge, Button, Card, Group, Image, Text, Flex } from '@mantine/core';
import classes from './CardItem.module.css';
import '@mantine/core/styles.css';
import { formatCurrency } from '../../../utilities/formatCurrency';
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useProductsCart } from '../../../context/ProductsCartContext';

interface CardItemProps {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  brand: string;
}

const CardItem: React.FC<CardItemProps> = ({ id, title, brand, discountPercentage, price, thumbnail }) => {

  const {getItemQuantity, increaseItemQuantity, removeFromCart} = useProductsCart()
  const quantity = getItemQuantity(id)

  return (
    <>
      <Card withBorder w={310} radius="md" p="md" shadow="sm" className={classes.card}>
        <Card.Section>
          <Link to={`/${id}`}><Image src={thumbnail} alt={title} height={280} /></Link>
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Link style={{color: 'black'}} to={`/${id}`}>
            <div style={{ height: 140 }}>
              <Group justify="apart">
                <Text fz="lg" fw={500}>
                  {title}
                </Text>
                <Badge size="sm" variant="light">
                  -{discountPercentage}%
                </Badge>
              </Group>
              <Text fz="sm" mt="xs">
                {brand}
              </Text>
              <Group gap={7} mt={1}>
                ${formatCurrency(price)}
              </Group>
            </div>
          </Link>

        </Card.Section>

        <Group mt="xs">
          <Button radius="md" style={{ flex: 1 }}>
            <Link to={`/${id}`} style={{color: 'white'}}>Show details</Link>
          </Button>
          <div>
            {
              quantity === 0 ? 
                <Button radius="md" >
                  <Flex onClick={() => increaseItemQuantity(id)} align='center' gap={5}>Add to Cart <AddShoppingCartIcon /></Flex>
                </Button>
                : <Button color='red' onClick={()=>removeFromCart(id)}>Remove</Button>
              }
          </div>
          
        </Group>

      </Card>

    </>
  )
}

export { CardItem }


