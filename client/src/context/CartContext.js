import { createContext, useReducer, useEffect } from 'react'

export const CartContext = createContext()

export const CartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return {
                cart: action.payload
            }
        case 'ADD_CART':
            return {
                cart: [action.payload, ...state.cart]
            }
        case 'REMOVE_CART':
            return {
                cart: state.cart.filter((i) => i.name !== action.payload.name)
            }
        
        default:
            return state
    }
}

export const CartContextProvider = ({ children }) => {
    const [state, cartDispatch] = useReducer(CartReducer, {
        cart: null
    })

    useEffect(() => {
        const myCart = JSON.parse(localStorage.getItem('myCart'))

        if (myCart) {
            cartDispatch({ type: 'SET_CART', payload: myCart})
        }
    }, [])

    return (
        <CartContext.Provider value = {{...state, cartDispatch}}>
            { children }
        </CartContext.Provider>
    )
}