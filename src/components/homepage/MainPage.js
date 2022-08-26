import Navbar from "../navbar/Navbar";
import AuthModal from "../UI/AuthModal";
import MainPageHeader from "./MainPageHeader";
import MainInfo from "./MainInfo";
import QuestionList from "./QuestionList";
import Footer from "../footer/Footer";

const MainPage = () => {
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
