import { ItemContext } from '../context/itemContext'
import {useContext} from 'react'

export const useItemContext = () => {
    const context = useContext(ItemContext)

    if (!context) {
        throw Error('useItemsContext must be inside an ItemContextProvider')
    }

    return context
}