import classes from "./MainPage.module.css"
import InputCta from "./InputCta";

const MainPageHeader = () => {
  return (
    <header className={classes["main-section-img"]}>
      <div className={classes["main-content"]}>
        <h1>Unlimited films, TV programmes and more.</h1>
        <p className={classes.caption}>Watch anywhere. Cancel at any time.</p>
        <InputCta></InputCta>
      </div>
    </header>
   );
}

export default MainPageHeader;
