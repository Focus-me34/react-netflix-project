import { useRef } from "react";
import Button from "react-bootstrap/Button";

import btnClasses from "../UI/Buttons.module.css"
import classes from "./InputCta.module.css"

const InputCta = () => {
  const email = useRef(null)

  const onChangeHanlder = () => {
    console.log(email);
  }

  return (
    <div className={classes["input-cta-container"]}>
      <p className={classes["input-cta-title"]}>Ready to watch? Enter your email to create or restart your membership.</p>
      <form className={classes["cta-form"]}>
        {/* <label htmlFor="email">E-mail</label> */}
        <div className={classes["input-cta-line"]}>
          <input onChange={onChangeHanlder} ref={email} className={classes["input-cta"]} type="email" id="email" name="email" placeholder={"E-mail"} />
          <Button className={btnClasses["btn-cta"]} variant="danger">Get Started &gt;</Button>{' '}
        </div>
      </form>
    </div>
  );
}

export default InputCta;
