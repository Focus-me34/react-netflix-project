import Logo from "../UI/Logo";
import Button from "react-bootstrap/Button";
import AuthModal from "../UI/AuthModal";

import classes from "./Navbar.module.css"
import btnClasses from "../UI/Buttons.module.css"

import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/slices/AuthSlice";
import { destroySession } from "../../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAuthModalOpen = useSelector(state => state.auth.isAuthModalOpen);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const toggleModalHandler = () => {
    dispatch(toggleModal())
  }

  const signOutHandler = () => {
    dispatch(destroySession());
  }

  return (
    <>
      <nav className={classes.navbar}>
        <Logo></Logo>
        {!isLoggedIn && <Button onClick={toggleModalHandler} className={btnClasses["btn-auth"]} variant="danger" size="s">Sign in</Button>}
        {isLoggedIn && <Button onClick={signOutHandler} className={btnClasses["btn-auth"]} variant="danger" size="s">Sign out</Button>}
      </nav>
      {isAuthModalOpen && <AuthModal />}
    </>
  );
}

export default Navbar;
