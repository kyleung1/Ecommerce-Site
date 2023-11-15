import React, { useState, ReactNode } from "react";
import NavbarProps from "../interfaces/navbar";

interface NavItemProps {
  icon: ReactNode;
  children?: ReactNode;
}

const NavItem = (props: NavItemProps) => {
  const [open, setOpen] = useState(true);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
};

export default NavItem;
