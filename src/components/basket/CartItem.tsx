import { Flex, Button } from "@mantine/core"
import { useProductsCart } from '../../context/ProductsCartContext'
import { useAppSelector } from '../../store/hook'
import { formatCurrency } from "../../utilities/formatCurrency"

type CartItemProps = {
  id: number;
  quantity: number;
}

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useProductsCart()
  const items = useAppSelector(state => state.cards.list)
  const item = items.find(i => i.id === id)
  if (item == null) return null

  return (
    <Flex>
      <img src={item.thumbnail} alt="" />
      <div>
        <p>{item.title}</p>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Flex gap={5}>
          <Button onClick={() => decreaseItemQuantity(id)}>-</Button>
          <span>{quantity}</span>
          <Button onClick={() => increaseItemQuantity(id)}>+</Button>
        </Flex>
      </div>
      <Button onClick={()=>removeFromCart(item.id)}>Delete</Button>
    </Flex>
  )
}

export default CartItem