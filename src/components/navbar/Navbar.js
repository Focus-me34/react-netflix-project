import Logo from "../UI/Logo";
// import ButtonUI from "../UI/ButtonUI";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from "./Navbar.module.css"
import btnClasses from "../UI/Buttons.module.css"

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <Logo></Logo>
      <Button className={btnClasses["btn-auth"]} variant="danger" size="s">Sign in</Button>
    </nav>
  );
}

export default Navbar;
