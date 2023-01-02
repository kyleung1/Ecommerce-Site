import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import DropdownMenu from './DropdownMenu';

const Navbar = (props) => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    
    const handleClick = () => {
        logout()
    }

    const handleDrop = () => {
        
    }

    return (
        <div>
            <nav className = "navbar">
                <ul className = "navbar-nav" ><a href = "/"><img className="logo" src="/images/martlogo.webp" width="60" /></a></ul>
                <ul className = "navbar-nav" ><a href = "/products">Products</a></ul>
                <ul className = "navbar-nav" ><a href = "/contact">Contact</a></ul>
                <ul className = "navbar-nav" ><a href = "/about">About</a></ul>
                {!user && (<ul className = "navbar-nav" ><a href = "/login">Login</a></ul>)}
                <ul className = "navbar-nav" ><a href="/cart"> <img src="/images/263142.png" width="20" /> </a></ul>
                <ul className = "navbar-nav" > {props.children} </ul>
                
                {user && user.admin === true && <a href = "/admin">Admin</a>}
            
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