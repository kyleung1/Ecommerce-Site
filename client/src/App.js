import Navbar from './components/Navbar';
import Home from './pages/home';
import Products from './pages/products';
import Contact from './pages/contact';
import About from './pages/about';
import Login from './pages/login';
import Cart from './pages/cart';
import Register from './pages/Register'
import COsuccess from './pages/COsuccess';
import COfail from './pages/COfail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/admin';

function App() {

  return (
    <div className = "App">
      <Router>  
      <Navbar/>
      <div className = "pages">
        <Routes>
          <Route path = "/" element = {<Home/>}></Route>
          <Route path = "/products" element = {<Products/>}></Route>
          <Route path = "/contact" element = {<Contact/>}></Route>
          <Route path = "/about" element = {<About/>}></Route>
          <Route path = "/login" element = {<Login/>}></Route>
          <Route path = "/cart" element = {<Cart/>}></Route>
          <Route path = "/register" element = {<Register/>}></Route>
          <Route path = "/admin" element = {<Admin/>}></Route>
          <Route path = "/success" element = {<COsuccess/>}></Route>
          <Route path = "/fail" element = {<COfail/>}></Route>
        </Routes>
      </div>
      </Router>
      </div>
    
  );
}

export default App