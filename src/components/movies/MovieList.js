import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../store/slices/MovieSlice";

import Movie from "./Movie"
import SpinLoader from "../UI/SpinLoader";

import classes from "./MovieList.module.css";


const MovieList = (props) => {
  const { allFavorites: favorite_movies, notification } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavorites());
  }, [getFavorites]);


  const isMovieFavourite = (prop_movie) => {
    return favorite_movies.some(movie => movie.id === prop_movie.id);
  }

  return (
    <div className={classes["movie-category-container"]}>
      <h2>{props.rank}</h2>
      <div className={classes["movie-category-list"]}>
        { !favorite_movies && notification?.status === "pending" && <SpinLoader />}
        { favorite_movies && notification?.status === "success" && props.movies.map(movie => <Movie isFavorite={isMovieFavourite(movie)} selectMovie={props.selectMovie} movie={movie} movies={props.movies} key={movie.id} />)}
        { favorite_movies && notification?.status === "pending" && props.movies.map(movie => <Movie isFavorite={isMovieFavourite(movie)} selectMovie={props.selectMovie} movie={movie} movies={props.movies} key={movie.id} />)}
        { notification?.status === "error" && <p>AN ERROR OCCURED</p>}
      </div>
    </div>
  );
}

export default MovieList;


// ? MANAGE THE VOLUME OF THE VIDEO
// useEffect(() => {
//   if (movieState.isSelectedMovie) video.current.volume = 0.1;
// }, [movieState.isSelectedMovie]);

// ? DIFFERENT SECTION BEING DISPLAED WITH THE TRAILER VIDEO FOR THE SELECTED MOVIE. CHANGED THE API SO DON'T HAVE IT ANYMORE
// <SeparationPattern />
// <div className={classes["movie-details"]}>
//   <p><span className={classes.synopsis}>Synopsis:</span> <br />{movieState.selectedMovie.synopsis}</p>
//   <video ref={video} controls autoPlay width="500" src={movieState.selectedMovie.trailer_url}>
//     <source src={movieState.selectedMovie.trailer_url} type="video/mp4" />
//   </video>
// </div>
// <SeparationPattern />
