import { Close } from "react-ionicons";
import { useDispatch, useSelector } from "react-redux";
import { unselectMovie } from "../../store/slices/MovieSlice";

import classes from "./SelectedMovieInformation.module.css";

// ! WHEN CLICKING ON A MOVIE, THIS MODAL POPS IN DISPLAYING THE INFORMATION OF THE SELECTED MOVIE.
const SelectedMovieInformation = () => {
  const { movie } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  return (
    <>
      <div className={classes["favorite-movie-details"]} style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${movie.backdrop_path})`}}>
        <div className={classes["container-close-icon"]}>
          <Close onClick={() => dispatch(unselectMovie())} color={'#ffffff'} title={"close-icon"} height="25px" width="25px" />
        </div>
        <div>
          <p className={classes.title}>{movie.title}</p>
          <p className={classes.synopsis}>{movie.synopsis}</p>
          <div className={classes["bottom-card"]}>
            <p className={classes["release-date"]}>Release date: {movie.release_date}</p>
            <p className={classes["vote-average"]}>⭐️ {movie.vote_average}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectedMovieInformation;
