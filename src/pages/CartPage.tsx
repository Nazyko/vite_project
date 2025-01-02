import { Flex } from '@mantine/core'
import CartItem from '../components/basket/CartItem'
import { useAppSelector } from '../store/hook'
import { useProductsCart } from '../context/ProductsCartContext'
import { formatCurrency } from '../utilities/formatCurrency'
import { Navigate } from 'react-router-dom'


const CartPage = () => {
  const { cartItems } = useProductsCart()
  const items = useAppSelector(state => state.cards.list)

  return (
    <>
      <div>
        <h1 style={{textAlign: 'center', fontSize: 40, margin: 20}}>Cart Page</h1>        
        <Flex gap={10} m={40} direction='column'>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item}/>
          ))}
          <Flex mt={50} justify='center' fw={700} ff='heading' style={{fontSize: 24}}>
            Total {formatCurrency(cartItems.reduce((total, cartItem) => {
              const item = items.find(i => i.id === cartItem.id)
              return total + (item?.price || 0) * cartItem.quantity
            }, 0))}
          </Flex>
        </Flex>          
      </div>
    </>
  )
}

export default CartPage
