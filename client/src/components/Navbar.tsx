import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import DropdownMenu from "./DropdownMenu";
import NavbarProps from "../interfaces/navbar";
import { useCartContext } from "../hooks/useCartContext";

const Navbar = (props: NavbarProps) => {
  const { logout } = useLogout();
  const { authState } = useAuthContext();
  const { cartState } = useCartContext();

  const links = document.querySelectorAll(".navbar .after-arrow");
  const arrows = document.querySelectorAll(".navbar .hover-arrow");

  arrows.forEach((arrow) => {
    const link = arrow.nextElementSibling;
    if (link) {
      link.addEventListener("mouseover", () => {
        if (link && link.classList.contains("after-arrow")) {
          arrow.classList.remove("hidden");
        }
      });

      link.addEventListener("mouseout", () => {
        if (link && link.classList.contains("after-arrow")) {
          arrow.classList.add("hidden");
        }
      });
    }
  });

  // let cartItemAmt = cartState.

  const handleClick = () => {
    logout();
  };

  const handleDrop = () => {};

  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-nav">
          <a href="/">
            <img className="logo" src="/images/martlogo.webp" width="60" />
          </a>
        </ul>
        <ul className="navbar-nav">
          <img
            src="/images/right-arrow.png"
            alt="arrow"
            className="hover-arrow hidden"
          />
          <a className="after-arrow" href="/products">
            Products
          </a>
        </ul>
        <ul className="navbar-nav">
          <img
            src="/images/right-arrow.png"
            alt="arrow"
            className="hover-arrow hidden"
          />
          <a className="after-arrow" href="/contact">
            Contact
          </a>
        </ul>
        <ul className="navbar-nav">
          <img
            src="/images/right-arrow.png"
            alt="arrow"
            className="hover-arrow hidden"
          />
          <a className="after-arrow" href="/about">
            About
          </a>
        </ul>
        {!authState.user && (
          <ul className="navbar-nav">
            <img
              src="/images/right-arrow.png"
              alt="arrow"
              className="hover-arrow hidden"
            />
            <a className="after-arrow" href="/login">
              Login
            </a>
          </ul>
        )}
        <ul className="navbar-nav">
          <img
            src="/images/right-arrow.png"
            alt="arrow"
            className="hover-arrow hidden"
          />
          <a className="after-arrow" href="/cart">
            <img src="/images/263142.png" width="30px" />{" "}
            <span className="cart-items">{cartState?.cart?.length}</span>
          </a>
        </ul>
        <ul className="navbar-nav"> {props.children} </ul>

        {authState.user && authState.user.admin === true && (
          <a href="/admin">Admin</a>
        )}

        {authState.user && (
          <div className="logged-in">
            <span> {authState.user.email} </span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
      </nav>
      <hr className="nav-line" color="black"></hr>
    </div>
  );
};

export default Navbar;
