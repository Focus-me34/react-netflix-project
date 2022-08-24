import { useDispatch } from "react-redux";
import { closeAuthModal } from "../../store/slices/AuthSlice";
import { unselectMovie } from "../../store/slices/MovieSlice";
import { closeWatchlistForm } from "../../store/slices/MovieSlice";


import classes from "./Backdrop.module.css"

// ! BACKDROP FOR MODALS
const Backdrop = () => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(unselectMovie());
    dispatch(closeWatchlistForm());
    dispatch(closeAuthModal());
  };

  return <div className={classes.backdrop} onClick={closeModalHandler} data-testid="backdrop"></div>;
};

export default Backdrop;
