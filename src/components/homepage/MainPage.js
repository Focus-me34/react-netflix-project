import Navbar from "../navbar/Navbar";
import AuthModal from "../UI/AuthModal";
import MainPageHeader from "./MainPageHeader";
import MainInfo from "./MainInfo";
import QuestionList from "./QuestionList";
import Footer from "../footer/Footer";
import { useEffect } from "react";

import classes from "./MainPage.module.css"

const MainPage = () => {

  // useEffect(() => {
  //   fetch("http://localhost:3000/member-data")
  //     .then(res => {
  //       console.log(res);
  //       return res.json()
  //     })
  //     .then(data => console.log(data))
  // }, [])




  return (
    <>
      <Navbar />
      <MainPageHeader></MainPageHeader>
      <MainInfo></MainInfo>
      <QuestionList></QuestionList>
      <Footer></Footer>
    </>
  );
}

export default MainPage;
