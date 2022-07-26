import classes from "./Button.module.css"

const ButtonUI = (props) => {

let buttonClasses

switch (props.type) {
  case "cta":
    buttonClasses = classes["btn-cta"]
    break;
  case "auth":
    buttonClasses = classes["btn-auth"]
    break;
  // default:
  //   break;
}

  return (
    <button type="button" className={`${classes.button} ${buttonClasses}`}></button>
   );
}

export default ButtonUI;
