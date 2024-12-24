import { Flex } from '@mantine/core'
import CartItem from '../components/basket/CartItem'
import { useAppSelector } from '../store/hook'
import { useProductsCart } from '../context/ProductsCartContext'
import { formatCurrency } from '../utilities/formatCurrency'


const CartPage = () => {
  const { cartItems } = useProductsCart()
  const items = useAppSelector(state => state.cards.list)

  return (
    <div>
      <h1 style={{textAlign: 'center', margin: 40}}>Cart Page</h1>        
      <Flex gap={10} m={40} align='center' justify='center'>
        {cartItems.map(item => (
          <CartItem key={item.id} {...item}/>
        ))}
        <div>
          Total {formatCurrency(cartItems.reduce((total, cartItem) => {
            const item = items.find(i => i.id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
          }, 0))}
        </div>
      </Flex>          
    </div>
  )
}

export default CartPage
