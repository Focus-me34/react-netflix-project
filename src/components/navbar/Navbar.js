import Logo from "../UI/Logo";
import Button from "react-bootstrap/Button";
import AuthModal from "../UI/AuthModal";

import classes from "./Navbar.module.css";
import btnClasses from "../UI/Buttons.module.css";

import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "../../store/slices/AuthSlice";
import { destroySession } from "../../store/slices/AuthSlice";
import { signOut } from "../../store/slices/AuthSlice";

const Navbar = () => {
  const isAuthModalOpen = useSelector((state) => state.auth.isAuthModalOpen);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch(openAuthModal());
  };

  const signOutHandler = () => {
    dispatch(destroySession());
  };

  return (
    <>
      <nav className={classes.navbar} data-testid="test-navbar">
        <Logo></Logo>
        {!isLoggedIn && (
          <Button
            onClick={openModalHandler}
            className={btnClasses["btn-auth"]}
            variant="danger"
            size="s"
            data-testid="button-sign-in"
          >
            Sign in
          </Button>
        )}
        {isLoggedIn && (
          <Button
            onClick={signOutHandler}
            className={btnClasses["btn-auth"]}
            variant="danger"
            size="s"
            data-testid="button-sign-out"
          >
            Sign out
          </Button>
        )}
      </nav>
      {isAuthModalOpen && <AuthModal />}
    </>
  );
};

export default Navbar;
