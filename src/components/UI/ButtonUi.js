import classes from "./Buttons.module.css"

const ButtonUI = (props) => {

let buttonClasses

switch (props.type) {
  case "cta":
    buttonClasses = classes["btn-cta"]
    break;
  case "auth":
    buttonClasses = classes["btn-auth"]
    break;
  case "qa":
    buttonClasses = classes["btn-qa"]
    break;
}

  return (
    <button type="button" className={`${classes.button} ${buttonClasses}`} onClick={props.onClick}>{props.children}</button>
   );
}

export default ButtonUI;
