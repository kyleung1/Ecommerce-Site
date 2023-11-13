import {useState} from 'react'
import { useItemContext } from '../hooks/useItemContext'
import { useAuthContext } from "../hooks/useAuthContext"

const ItemForm = () => {
    const {dispatch} = useItemContext()
    const {user} = useAuthContext()

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError("You must be logged in")
            return
        }

        const item = {name, price, stock}

        const response = await fetch('http://localhost:' + process.env.REACT_APP_PORT + '/item', {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setPrice('')
            setStock('')
            setError(null)
            console.log("new item added")
            dispatch({type: 'CREATE_ITEM', payload: json})
        }
    }

    return (
        <form className = "create-Item" onSubmit = {handleSubmit}>
            <h3> Add a new Item </h3>

            <label>Item name:</label>
            <input
                type = "text"
                onChange = {(e) => setName(e.target.value)}
                value = {name}
            />

            <label>Item price:</label>
            <input
                type = "text"
                onChange = {(e) => setPrice(e.target.value)}
                value = {price}
            />

            <label>Item stock:</label>
            <input
                type = "text"
                onChange = {(e) => setStock(e.target.value)}
                value = {stock}
            />
            <button>Add Item</button>
            {error && <div className = "item-error">{error}</div>}
        </form>
        
    )
}

export default ItemForm