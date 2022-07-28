import ReactDom from "react-dom";
import { useRef } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import btnClasses from "../UI/Buttons.module.css"

import classes from "./AuthModal.module.css"


// ! BACKDROP FOR THE MODAL
const Backdrop = (props) => {
  const closeModalHandler = () => {
    classes += " d-none";
    props.onCloseModal();
  }

  return (
    <div className={classes.backdrop} onClick={closeModalHandler}></div>
  );
}

// ! CONTENT OF TYHE AUTH MODAL
const AuthModalContent = () => {
  const email = useRef();
  const password = useRef();



  return (
    <div className={classes["auth-modal"]}>
      <h2>Sign In</h2>
      <form action="">
        {/* <label for="auth-email">Email</label> */}
        <input ref={email} type="email" name="auth-email" id="auth-email" placeholder="Email"></input>

        {/* <label for="auth-password"></label> */}
        <input ref={password} type="password" name="auth-password" id="auth-password" placeholder="Password"></input>
        <Button className={`${btnClasses["btn-auth"]} w-100`} variant="danger" size="s">Sign in</Button>

        <div className={classes["auth-remember-me-section"]}>
          <div className={classes["auth-remember-me"]}>
            <input type="checkbox" value="lsRememberMe" id="rememberMe" /> <label for="rememberMe">Remember me</label>
          </div>
          <p>Need help?</p>
        </div>
      </form>

      <div className={classes["auth-modal-bottom"]}>
        <div>
          <p>New to Netflix? <Link to="/sign-up">Sign up now</Link></p>

          <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className={btnClasses["btn-link"]}> Learn more.</span></p>
        </div>
      </div>
    </div>
  );
}













// ! AUTH MODAL + BACKDROP
const AuthModal = (props) => {
  return (
    <>
      {ReactDom.createPortal(<Backdrop onClick={props.closeModalHandler} onCloseModal={props.onCloseModal} />, document.getElementById("backdrop"))}
      {ReactDom.createPortal(<AuthModalContent />, document.getElementById("auth-modal"))}
    </>
  );
}

export default AuthModal;
