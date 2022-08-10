import { useDispatch } from "react-redux";
import { closeAuthModal } from "../../store/slices/AuthSlice";
import { unselectMovie } from "../../store/slices/MovieSlice";


import classes from "./Backdrop.module.css"

// ! BACKDROP FOR MODALS
const Backdrop = () => {
  const dispatch = useDispatch();

  const closeModlHandler = () => {
    dispatch(closeAuthModal());
    dispatch(unselectMovie());
  };

  return <div className={classes.backdrop} onClick={closeModlHandler}></div>;
};

export default Backdrop;
