import { createContext, useReducer } from 'react'

export const ItemContext = createContext()

export const itemsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                items: action.payload
            }
        case 'CREATE_ITEM':
            return {
                items: [action.payload, ...state.items]
            }
        case 'DELETE_ITEM':
            return {
                items: state.items.filter((i) => i._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ItemContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(itemsReducer, {
        items: null
    })


    return (
        <ItemContext.Provider value = {{...state, dispatch}}>
            { children }
        </ItemContext.Provider>
    )
}

// ItemContext.Provider wraps app in index.js
// The value is what in the ItemContext.Provider is available in other components
// useReducer() takes reducer function and initial value for state
// dispatch({type: "SET_ITEMS", payload: data to make the change}) is used to update the state of reducer
// itemsReducer = (state, action), state is the previous state before change and action is the object that was passed into dispatch {type: , payload:}
// ...state,  the spread operator (...) allows an iterable object (such as an array or an object) to be expanded into its individual elements.