import { NavLink, NavNavLink } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Logo from "../UI/Logo";

import classes from "./NavbarDetailed.module.css"
import btnClasses from "../UI/Buttons.module.css"

const NavbarDetailed = () => {

  const logOutHandler = () => {
    console.log("Log out fetch");
  }

  const isLinkActive = (navData) => {
    return navData.isActive ? classes.active : ""
  }

  return (
    <nav className={classes["navbar-detailed"]}>
      <div className={classes["nav"]}>
        <Logo></Logo>

        <div>
          <ul>
            <li><NavLink className={isLinkActive} to={"/"}>Home</NavLink></li>
            <li><NavLink className={isLinkActive} to={"/movies"}>Movies</NavLink></li>
            <li><NavLink className={isLinkActive} to={"/series"}>Series</NavLink></li>
            <li><NavLink className={isLinkActive} to={"/favourites"}>Favourite</NavLink></li>
          </ul>
        </div>
      </div>

      <div className={classes["nav-profil"]}>
        <p><NavLink className={isLinkActive} to="/account">Account</NavLink></p>
        <Button onClick={logOutHandler} className={btnClasses["btn-auth"]} variant="danger" size="s">Sign out</Button>
      </div>
    </nav>
  );
}

export default NavbarDetailed;
