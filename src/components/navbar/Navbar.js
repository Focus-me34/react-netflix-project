import Logo from "../UI/Logo";
import Button from "react-bootstrap/Button";
import AuthModal from "../UI/AuthModal";

import classes from "./Navbar.module.css"
import btnClasses from "../UI/Buttons.module.css"

import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/slices/AuthSlice";

const Navbar = () => {
  const isAuthModalOpen = useSelector(state => state.auth.isAuthModalOpen);
  const dispatch = useDispatch();



  const toggleModalHandler = () => {
    dispatch(toggleModal())
  }

  return (
    <>
      <nav className={classes.navbar}>
        <Logo></Logo>
        <Button onClick={toggleModalHandler} className={btnClasses["btn-auth"]} variant="danger" size="s">Sign in</Button>
      </nav>
      {isAuthModalOpen && <AuthModal />}
    </>
  );
}

export default Navbar;
