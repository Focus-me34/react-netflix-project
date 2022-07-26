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
    <form className={classes["cta-form"]}>
      {/* <label htmlFor="email">E-mail</label> */}
      <div className={classes["input-cta-line"]}>
        <input onChange={onChangeHanlder} ref={email} className={classes["input-cta"]} type="email" id="email" name="email" placeholder={"E-mail"} />
        <Button className={btnClasses["btn-cta"]} variant="danger">Get Started &gt;</Button>{' '}
      </div>
    </form>
  );
}

export default InputCta;
