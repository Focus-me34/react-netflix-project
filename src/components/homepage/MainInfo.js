import classes from "./MainInfo.module.css"
import Container from 'react-bootstrap/Container';
import Logo from "../UI/Logo";

import kids from "./../../images/kids.png"


const MAIN_INFO_CONTENT = [
  { title: "Enjoy on your TV.", text: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more." },
  { title: "Download your programmes to watch offline.", text: "Save your favourites easily and always have something to watch." },
  { title: "Watch everywhere.", text: "Stream unlimited films and TV programmes on your phone, tablet, laptop and TV without paying more." },
  { title: "Create profiles for children.", text: "Send children on adventures with their favourite characters in a space made just for them – free with your membership." },
]

const MainInfo = () => {
  return (
    <section className={classes["main-info"]}>
      <div className={classes["main-info-card"]}>
        <div className={classes["main-info-card-text"]}>
          <h2>{MAIN_INFO_CONTENT[0].title}</h2>
          <p>{MAIN_INFO_CONTENT[0].text}</p>
        </div>

        <div className={classes["main-info-card-media"]}>
          <Logo></Logo>
        </div>
      </div>


      <div className={classes["main-info-card"]}>
        <div className={classes["main-info-card-media"]}>
          <Logo classInfo={"margin-left"}></Logo>
        </div>

        <div className={classes["main-info-card-text"]}>
          <h2>{MAIN_INFO_CONTENT[1].title}</h2>
          <p>{MAIN_INFO_CONTENT[1].text}</p>
        </div>
      </div>


      <div className={classes["main-info-card"]}>
        <div className={classes["main-info-card-text"]}>
          <h2>{MAIN_INFO_CONTENT[2].title}</h2>
          <p>{MAIN_INFO_CONTENT[2].text}</p>
        </div>

        <div className={classes["main-info-card-media"]}>
          <Logo></Logo>
        </div>
      </div>


      <div className={classes["main-info-card"]}>
        <div className={classes["main-info-card-media"]}>
          {/* <Logo classInfo={"margin-left"}></Logo> */}
          <img src={kids} alt="Image for kids" />
        </div>

        <div className={classes["main-info-card-text"]}>
          <h2>{MAIN_INFO_CONTENT[3].title}</h2>
          <p>{MAIN_INFO_CONTENT[3].text}</p>
        </div>
      </div>
    </section>
  );
}

export default MainInfo;
