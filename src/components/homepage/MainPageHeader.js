import classes from "./MainPage.module.css"
import InputCta from "./InputCta";

const MainPageHeader = () => {
  return (
    <header className={classes["main-section-img"]}>
      <div className={classes["main-content"]}>
        <h1>Unlimited films, TV programmes and more.</h1>
        <p>Watch anywhere. Cancel at any time.</p>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        <InputCta></InputCta>
      </div>
    </header>
   );
}

export default MainPageHeader;
