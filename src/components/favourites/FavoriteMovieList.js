import ReactDom from "react-dom";
import { useSelector } from "react-redux";

import FavoriteMovie from "./FavoriteMovie";
import SelectedMovieInformation from "../UI/SelectedMovieInformation";
import Backdrop from "../UI/Backdrop";

import classes from "./FavoriteMovie.module.css"


const FavoriteMovieList = (props) => {
  const { isSelectedMovie, movie } = useSelector((state) => state.movie);

  return (
    <>
    <div className={classes["favorite-movie-list"]}>
      {(props.movies.length > 0) && props.movies.map(movie => <FavoriteMovie movie={movie} allMovies={props.movies} key={movie.id} /> )}
      {(props.movies.length === 0) && <p className={classes["no-favorite-movie-msg"]}>You don't have any favorite movie yet. Have a look at the "Movies" section and try adding one!</p>}
    </div>

    { isSelectedMovie &&
      <>
        {ReactDom.createPortal(<Backdrop />, document.getElementById("backdrop"))}
        {ReactDom.createPortal(<SelectedMovieInformation movie={movie} />, document.getElementById("movie-description"))}
      </>
    }
      </>
  );
}

export default FavoriteMovieList;
