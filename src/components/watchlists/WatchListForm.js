import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import { getAllWatchlists } from "../../store/slices/MovieSlice";
import { addMovieToWatchlist } from "../../store/slices/MovieSlice";
import { closeWatchlistForm } from "../../store/slices/MovieSlice";
import { Close } from "react-ionicons";


import SpinLoader from "../UI/SpinLoader"
import Button from "react-bootstrap/Button";

import classes from "./WatchListForm.module.css";
import btnClasses from "../UI/Buttons.module.css";


const WatchListForm = () => {
  const [showForm, setShowForm ] = useState(false)
  const { allWatchlists: watchlists, notification, movie, movieId } = useSelector(state => state.movie)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const wl_name = useRef(null);
  const [readyToSubmit, setReadyToSubmit] = useState(false)
  const [userWatchlists, setUserWatchlists] = useState(null)


  useEffect(() => {
    if (!watchlists) dispatch(getAllWatchlists());
    if (watchlists && (userWatchlists === null)) getCurrentUserWatchlists();
  }, [getAllWatchlists, watchlists, userWatchlists]);


  const addMovieToWatchlistHandler = () => {
    dispatch(addMovieToWatchlist(wl_name.current.value, movieId));
    dispatch(closeWatchlistForm())
  }

  const closeWatchlistModal = () => {
    dispatch(closeWatchlistForm());
  }

  const showFormHandler = () => {
    setShowForm(prevState => !prevState);
    setReadyToSubmit(false);
  }

  const readyToSubmitHandler = () => {
    wl_name.current.value !== "" ? setReadyToSubmit(true) : setReadyToSubmit(false);
  }

  const getCurrentUserWatchlists = () => {
    const currentUserWatchlists = watchlists.filter(wl => wl.user_id === user.id)
    setUserWatchlists(currentUserWatchlists);
  }


  return (
    <div className={classes["watchlist-form-control"]}>

      <div className={classes["container-close-icon"]}>
        <Close onClick={ closeWatchlistModal } color={'#ffffff'} title={"close-icon"} height="30px" width="30px" />
      </div>

      { notification?.status === "pending" && <SpinLoader />}

      { (userWatchlists?.length !== 0) && !showForm && (notification.status === "success") &&
      <div className={classes["existing-watchlist-form-container"]}>
        <h2>Pick an existing Watchlist</h2>
        <form id="add-to-existing-watchlist-form" className={classes["add-to-existing-watchlist-form"]}>
          <input name="movie-name" id="movie-name-input" type="text" disabled placeholder="Give a name to your watchlist" value={movie.title} />

          {/* <label htmlFor="watchlist-name" id="watchlist-name-label"></label> */}
          <select name="watchlist-name" id="watchlist-name-select" ref={wl_name}>
            {userWatchlists?.map((wl) => <option value={wl.name} key={wl.id}>{wl.name}</option>)}
          </select>

          <Button type="button" onClick={ addMovieToWatchlistHandler } form="add-to-existing-watchlist-form" className={btnClasses["btn-watchlist-form"]} variant="success">Add to this watchlist</Button>{' '}
          <Button type="button" onClick={showFormHandler} className={btnClasses["btn-watchlist-form"]} variant="danger">Create a new watchlist</Button>{' '}
        </form>
      </div>
      }


      { (userWatchlists?.length > 0) && showForm && (notification.status === "success") &&
        <div className={classes["unexisting-watchlist-form-container"]}>
          <h2>Create a brand new watchlist</h2>

          <form id="add-to-new-watchlist-form" className={classes["add-to-new-watchlist-form"]}>
            <input name="movie-name" id="movie-name-input" type="text" disabled value={movie.title} />
            <input onChange={readyToSubmitHandler} name="watchlist-name" id="watchlist-name-input" type="text" placeholder="Give a name to your watchlist" ref={wl_name} />
          </form>

          <Button type="button" onClick={ addMovieToWatchlistHandler } disabled={!readyToSubmit} form="add-to-new-watchlist-form" className={btnClasses["btn-watchlist-form"]} variant="success">Create this new watchlist</Button>{' '}
          <Button type="button" onClick={showFormHandler} className={btnClasses["btn-watchlist-form"]} variant="danger">Add to an existing watchlist</Button>{' '}

        </div>
      }


      { (userWatchlists?.length === 0) && (notification.status === "success") &&
        <div className={classes["unexisting-watchlist-form-container"]}>
          <h2>Create a brand new watchlist</h2>

          <form id="add-to-new-watchlist-form" className={classes["add-to-new-watchlist-form"]}>
            <input name="movie-name" id="movie-name-input" type="text" disabled value={movie.title} />
            <input onChange={readyToSubmitHandler} name="watchlist-name" id="watchlist-name-input" type="text" placeholder="Give a name to your watchlist" ref={wl_name} />
          </form>

          <Button disabled={!readyToSubmit} type="button" onClick={ addMovieToWatchlistHandler } form="add-to-new-watchlist-form" className={btnClasses["btn-watchlist-form"]} variant="success">Create this new watchlist</Button>{' '}
        </div>
      }

      {/* FORMIK HERE */}
      {/* {showForm && <form></form>} */}
    </div>
  );
}

export default WatchListForm;
