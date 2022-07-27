import { Link } from "react-router-dom";

import classes from "./FooterLink.module.css"

const FooterLink = (props) => {
  return (
    <li className={classes["footer-li"]}>
      <Link to={props.url} className={classes["footer-link"]}>{props.name}</Link>
    </li>
  );
}

export default FooterLink;
