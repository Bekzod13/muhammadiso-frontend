import { Button, Navbar as Nav, NavbarCollapse, NavbarToggle, } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Navbar = (props: {setAuth: any}) => {

    const logout = () => {
        localStorage.removeItem("token");
        props.setAuth(false);
    }

    return  <Nav fluid rounded className="border">
    <Link to={"/"}>
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Employee managament</span>
    </Link>
    <NavbarToggle />
    <NavbarCollapse>
        <Button onClick={logout}>Log out</Button>
    </NavbarCollapse>
  </Nav>
}

export default Navbar;