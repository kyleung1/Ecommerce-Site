import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    
    const handleClick = () => {
        logout()
    }

    return (
        <div>
            <nav className = "navbar">
            <a href = "/"><img className="logo" src="/images/martlogo.webp" width="60" /></a>
            <div className = "links">
                <a href = "/products">Products</a>
                <a href = "/contact">Contact</a>
                <a href = "/about">About</a>
                {!user && (<a href = "/login">Login</a>)}
                <a href="/cart"> <img src="/images/263142.png" width="20" /> </a>
                {user && user.admin === true && <a href = "/admin">Admin</a>}
            </div>
            {user && (
                <div className = "logged-in">
                    <span> {user.email} </span>
                    <button onClick = {handleClick}>Log out</button>
                        
                </div>
            )}
            </nav>
            <hr className = "nav-line" color= "black"></hr>
        </div>
        
    );
}

export default Navbar;