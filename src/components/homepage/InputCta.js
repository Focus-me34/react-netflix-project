import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import btnClasses from "../UI/Buttons.module.css"
import classes from "./InputCta.module.css"

const InputCta = () => {
  const [disableButton, setDisableButton] = useState(true);
  const email = useRef(null)
  const navigate = useNavigate();

  const onChangeHanlder = () => {
    setDisableButton(!email.current.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    navigate("/movies")
  }

  return (
    <div className={classes["input-cta-container"]}>
      <p className={classes["input-cta-title"]}>Ready to watch? Enter your email to create or restart your membership.</p>
      <form onSubmit={onSubmitHandler} id="cta-form" className={`${classes["cta-form"]} ${classes["form-cta"]}`}>
        <div className={classes["input-cta-line"]}>
          <input onChange={onChangeHanlder} ref={email} className={`${classes["input-cta"]} ${classes["email-cta"]}`} type="email" name="email" placeholder={"E-mail"} />
          <Button type="submit" form="cta-form" disabled={disableButton} className={btnClasses["btn-cta"]} variant="danger">Get Started &gt;</Button>{' '}
        </div>
      </form>
    </div>
  );
}

export default InputCta;
