import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../store/slices/MovieSlice";
import { getAllWatchlists } from "../../store/slices/MovieSlice";
import { selectMovie, unselectMovie } from "../../store/slices/MovieSlice";

import Movie from "./Movie"
import SpinLoader from "../UI/SpinLoader";

import classes from "./MovieList.module.css";

export const getArrayWithAllWatchlistedMovies = (watchlists, user) => {
  if (watchlists === null) {
    return null
  } else {
    const allWatchlistedMovies = [];
    const currentUserWatchlists = watchlists.filter(wl => wl.user_id === user.id)
    currentUserWatchlists.map(wl => wl.movies.forEach((movie) => allWatchlistedMovies.push(movie)));
    return allWatchlistedMovies;
  }
};

const MovieList = (props) => {
  const { allFavorites: favorite_movies, allWatchlists: watchlists, isSelectedMovie, notification } = useSelector((state) => state.movie);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    if (watchlists === null) dispatch(getAllWatchlists());
    if (favorite_movies === null) dispatch(getFavorites());
  }, [getFavorites, getAllWatchlists, watchlists]);


  const isMovieFavourite = (prop_movie) => {
    return favorite_movies.some(movie => movie.id === prop_movie.id);
  }

  const isMovieInWatchlist = (prop_movie) => {
    const watchlistedMovies = getArrayWithAllWatchlistedMovies(watchlists, user);
    return watchlistedMovies.some((movie) => movie.id === prop_movie.id);
  };

  const selectMovieHandler = (movie_id, movie) => {
    !isSelectedMovie ? dispatch(selectMovie({ movieId: movie_id, movie: movie })) : dispatch(unselectMovie());
  };

  return (
    <div className={classes["movie-category-container"]}>
      <h2>{props.rank}</h2>
      <div className={classes["movie-category-list"]}>

        { (!favorite_movies || !watchlists) && notification?.status === "pending" && <SpinLoader />}
        { (!favorite_movies && watchlists) && notification?.status === "pending" && <SpinLoader />}
        { (favorite_movies && !watchlists) && notification?.status === "pending" && <SpinLoader />}

        { (favorite_movies && watchlists) && notification?.status === "success" && props.movies.map(movie => <Movie selectMovie={selectMovieHandler} isFavorite={isMovieFavourite(movie)} isInWatchlist={isMovieInWatchlist(movie)} movie={movie} movies={props.movies} key={movie.id} />)}
        { (favorite_movies && watchlists) && notification?.status === "pending" && props.movies.map(movie => <Movie selectMovie={selectMovieHandler} isFavorite={isMovieFavourite(movie)} isInWatchlist={isMovieInWatchlist(movie)} movie={movie} movies={props.movies} key={movie.id} />)}
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
