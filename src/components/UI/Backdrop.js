import { useDispatch } from "react-redux";
import { closeAuthModal } from "../../store/slices/AuthSlice";
import { unselectMovie } from "../../store/slices/MovieSlice";
import { closeWatchlistForm } from "../../store/slices/MovieSlice";


import classes from "./Backdrop.module.css"

// ! BACKDROP FOR MODALS
const Backdrop = () => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(closeAuthModal());
    dispatch(unselectMovie());
    dispatch(closeWatchlistForm());
  };

  return <div className={classes.backdrop} onClick={closeModalHandler}></div>;
};

export default Backdrop;
