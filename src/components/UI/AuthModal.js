import ReactDOM from "react-dom";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/slices/AuthSlice";
import { signIn } from "../../store/slices/AuthSlice";

import Backdrop from "./Backdrop";
import Button from "react-bootstrap/Button";
import btnClasses from "../UI/Buttons.module.css"
import SpinLoader from "./SpinLoader";

import classes from "./AuthModal.module.css"

// ! CONTENT OF THE AUTH MODAL
const AuthModalContent = () => {
  const [authType, setAuthType] = useState("signin");
  const [isError, setIsError] = useState({ status: false, message: "" })
  const notification = useSelector((state) => state.auth.notification);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ! SIGN IN REFS
  const emailSignIn = useRef();
  const passwordSignIn = useRef();

  // ! SIGN UP REFS
  const emailSignup = useRef()
  const passwordSignUp = useRef()
  const passwordSignUpConfirmation = useRef()


  const signinHandler = (e) => {
    e.preventDefault();

    if ((emailSignIn.current.value !== "") &&  passwordSignIn.current.value !== "") {
      // try{
        dispatch(signIn({ email: emailSignIn.current.value, password: passwordSignIn.current.value }))
      // } finally {
      //   setTimeout(() => {
      //     navigate("/movies");
      //   }, 1000);
      // }
    } else {
      setIsError({ status: true, message: "Make sure you povide both email and password" });
    }
  }


  const signupHandler = (e) => {
    e.preventDefault();

    if (passwordSignUp.current.value === passwordSignUpConfirmation.current.value) {
      dispatch(signUp({ email: emailSignup.current.value, password: passwordSignUp.current.value }));
    } else {
      setIsError({ status: true, message: "Make sure the password confirmation matches your password" });
    }
  }

  const changeAuthType = () => {
    authType === "signin" ? setAuthType("signup") : setAuthType("signin")
  }

  return (
    <>
      {authType === "signin" &&
        <div className={classes["auth-modal"]}>
          <h2>Sign In</h2>
          <form onSubmit={signinHandler} action="">
            <input ref={emailSignIn} type="email" name="auth-email" id="auth-email" placeholder="Email" aria-label="auth-email-input-sign-in"></input>
            <input ref={passwordSignIn} type="password" name="auth-password" id="auth-password" placeholder="Password" aria-label="auth-password-input-sign-in"></input>

            {isError.status && <p className={classes["error-message"]}>{isError.message}</p>}

            {(notification === null || notification?.status !== "pending") && <Button type="submit" className={`${btnClasses["btn-auth"]} w-100`} variant="danger" size="s" data-testid="btn-form-sign-in">Sign in</Button>}
            {notification?.status === "pending" && <SpinLoader />}

            <div className={classes["auth-remember-me-section"]}>
              <div className={classes["auth-remember-me"]}>
                <input type="checkbox" value="lsRememberMe" id="rememberMe" /> <label htmlFor="rememberMe">Remember me</label>
              </div>
              <p>Need help?</p>
            </div>
          </form>

          <div className={classes["auth-modal-bottom"]}>
            <div>
              <p>New to Netflix? <span className={classes["auth-switch"]} onClick={changeAuthType} data-testid="auth-modal-sign-up-btn">Sign up</span> now</p>

              <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className={btnClasses["btn-link"]}> Learn more.</span></p>
            </div>
          </div>
        </div>}

      {authType === "signup" &&
        <div className={classes["auth-modal"]}>
          <h2>Sign Up</h2>
          <form onSubmit={signupHandler} action="">
            <input ref={emailSignup} type="email" name="auth-email" id="auth-email" placeholder="Email"></input>
            <input ref={passwordSignUp} type="password" name="auth-password" id="auth-password" placeholder="Password"></input>
            <input ref={passwordSignUpConfirmation} type="password" name="auth-password-confirmation" id="auth-password-confirmation" placeholder="Password confirmation"></input>

            {isError.status && <p className={classes["error-message"]}>{isError.message}</p> }

            <Button type="submit" className={`${btnClasses["btn-auth"]} w-100`} variant="danger" size="s" data-testid="btn-form-sign-up">Sign up</Button>
          </form>

          <div className={classes["auth-modal-bottom"]}>
            <div>
              <p>Already have an account? <span className={classes["auth-switch"]} onClick={changeAuthType} data-testid="auth-modal-sign-in-btn">Sign in</span> now</p>

              <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className={btnClasses["btn-link"]}> Learn more.</span></p>
            </div>
          </div>
        </div>}

    </>
  );
}

// ! AUTH MODAL + BACKDROP
const AuthModal = () => {
  const nodeBackdrop = document.createElement("div");
  document.body.appendChild(nodeBackdrop);

  const nodeAuthModalContent = document.createElement("div");
  document.body.appendChild(nodeAuthModalContent);

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, nodeBackdrop)}
      {/* {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))} */}
      {ReactDOM.createPortal(<AuthModalContent />, nodeAuthModalContent)}
      {/* {ReactDOM.createPortal(<AuthModalContent />, document.getElementById("auth-modal"))} */}
    </>
  );
}

export default AuthModal;
