import { createContext, ReactNode, useContext } from "react";
import { useLocalstorage } from "../hooks/useLocalstorage";

type ProductsCartProviderProps = {
    children: ReactNode;
}

type ProductsCartContext = {
    getItemQuantity: (id: number) => number
    increaseItemQuantity: (id: number) => void
    decreaseItemQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartItems: CartItem[]
    cartQuantity: number
}

type CartItem = {
    id: number;
    quantity: number;
}

const ProductsCartContext = createContext({} as ProductsCartContext)

export const useProductsCart = () => {
    return useContext(ProductsCartContext)
}

export const ProductsCartProvider = ({ children }: ProductsCartProviderProps) => {
    const [cartItems, setCartItems] = useLocalstorage<CartItem[]>("shopping-cart",[])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseItemQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseItemQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }


    return (
        <ProductsCartContext.Provider 
            value={{ 
                getItemQuantity, 
                increaseItemQuantity, 
                decreaseItemQuantity, 
                removeFromCart,
                cartItems,
                cartQuantity
            }}
        >
            {children}
        </ProductsCartContext.Provider>
    )
}