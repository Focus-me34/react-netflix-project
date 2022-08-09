import FavoriteMovie from "./FavoriteMovie";
import classes from "./FavoriteMovie.module.css"

const FavoriteMovieList = (props) => {

  return (
    <div className={classes["favorite-movie-list"]}>
      {props.movies.map(movie => <FavoriteMovie movie={movie} allMovies={props.movies} key={movie.id} /> )}
    </div>
  );
}

export default FavoriteMovieList;
