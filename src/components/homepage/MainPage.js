import Navbar from "../navbar/Navbar";
import MainPageHeader from "./MainPageHeader";
import MainInfo from "./MainInfo";
import classes from "./MainPage.module.css"

const MainPage = () => {
  return (
    <>
      <Navbar />
      <MainPageHeader></MainPageHeader>
      <MainInfo></MainInfo>
    </>
  );
}

export default MainPage;
