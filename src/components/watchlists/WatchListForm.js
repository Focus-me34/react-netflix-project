import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import { getAllWatchlists } from "../../store/slices/MovieSlice";
import { addMovieToWatchlist } from "../../store/slices/MovieSlice";
import { closeWatchlistForm } from "../../store/slices/MovieSlice";

import SpinLoader from "../UI/SpinLoader"
import Button from "react-bootstrap/Button";

import classes from "./WatchListForm.module.css";
import btnClasses from "../UI/Buttons.module.css";


const WatchListForm = () => {
  const [showForm, setShowForm ] = useState(true)
  const { allWatchlists: watchlists, notification, movie, movieId } = useSelector(state => state.movie)
  const dispatch = useDispatch()
  const wl_name = useRef(null)

  console.log(movie);
  useEffect(() => {
    dispatch(getAllWatchlists());
  }, [getAllWatchlists]);

  const addMovieToWatchlistHandler = () => {
    dispatch(addMovieToWatchlist(wl_name.current.value, movieId));
    dispatch(closeWatchlistForm())
  }

  return (

    <div className={classes["watchlist-form-control"]}>
      { notification?.status === "pending" && <SpinLoader />}

      { watchlists && !showForm && (notification.status === "success") &&
      <div className={classes["existing-watchlist-form-container"]}>
        <h2>Pick an existing Watchlist</h2>
        <form id="add-to-existing-watchlist-form" className={classes["add-to-existing-watchlist-form"]}>
          <input name="movie-name" id="movie-name-input" type="text" disabled placeholder="Give a name to your watchlist" value={movie.title} ref={wl_name} />

          {/* <label htmlFor="watchlist-name" id="watchlist-name-label"></label> */}
          <select name="watchlist-name" id="watchlist-name-select" ref={wl_name}>
            {watchlists.map((wl) => <option value={wl.name} key={wl.id}>{wl.name}</option>)}
          </select>

          <Button type="button" onClick={ addMovieToWatchlistHandler } form="existing" className={btnClasses["btn-watchlist-form"]} variant="danger">Add to this watchlist</Button>{' '}
          <Button type="button" onClick={() => setShowForm(true)} className={btnClasses["btn-watchlist-form"]} variant="danger">Create a new watchlist</Button>{' '}
        </form>
      </div>
      }

      { watchlists && showForm && (notification.status === "success") &&
        <div className={classes["unexisting-watchlist-form-container"]}>
          <h2>Create a brand new watchlist</h2>

          <form id="add-to-new-watchlist-form" className={classes["add-to-new-watchlist-form"]}>
            <input name="movie-name" id="movie-name-input" type="text" disabled placeholder="Give a name to your watchlist" value={movie.title} ref={wl_name} />
            <input name="watchlist-name" id="watchlist-name-input" type="text" placeholder="Give a name to your watchlist" ref={wl_name} />
          </form>

          <Button type="button" onClick={ addMovieToWatchlistHandler } form="existing" className={btnClasses["btn-watchlist-form"]} variant="danger">Create this new watchlist</Button>{' '}
          <Button type="button" onClick={() => setShowForm(false)} className={btnClasses["btn-watchlist-form"]} variant="danger">Add to an existing watchlist</Button>{' '}

        </div>
      }

      {/* FORMIK HERE */}
      {/* {showForm && <form></form>} */}
    </div>
  );
}

export default WatchListForm;
