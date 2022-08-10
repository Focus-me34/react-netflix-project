import FavoriteMovie from "./FavoriteMovie";
import classes from "./FavoriteMovie.module.css"

const FavoriteMovieList = (props) => {

  return (
    <div className={classes["favorite-movie-list"]}>
      {(props.movies.length > 0) && props.movies.map(movie => <FavoriteMovie movie={movie} allMovies={props.movies} key={movie.id} /> )}
      {(props.movies.length === 0) && <p className={classes["no-favorite-movie-msg"]}>You don't have any favorite movie yet. Have a look at the "Movies" section and try adding one!</p>}
    </div>
  );
}

export default FavoriteMovieList;
