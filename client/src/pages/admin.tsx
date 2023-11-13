import {useEffect, useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useItemContext } from '../hooks/useItemContext'

//components
import ItemForm from '../components/ItemForm'
import ProductDetails from '../components/ProductDetails'

const Admin = () => {
    const{items, dispatch} = useItemContext()
    const {user} = useAuthContext

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch("http://localhost:" + process.env.REACT_APP_PORT + "/item2")
            const json = await response.json()

            if (response.ok) {
                // setItems(json)
                dispatch({type: 'SET_ITEMS', payload: json})
            }
        }

        fetchItems()
    }, [])

    return (
        <div className = "AdminPage">
            <h2>Admin page</h2>
            <div className = "product_items">
                {items && items.map((item) => (
                    <ProductDetails key = {item._id} item = {item}/>
                ))}
            </div>
            
            <div>
                <ItemForm/>
            </div>
            
        </div>
    );
}

export default Admin;