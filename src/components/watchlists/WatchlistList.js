import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../store/slices/MovieSlice";

import Movie from "../movies/Movie";
import SpinLoader from "../UI/SpinLoader";

import classes from "./WatchlistList.module.css";

const WatchlistList = (props) => {
  const { allFavorites: favorite_movies, notification } = useSelector(state => state.movie)
  const dispatch = useDispatch();

  useEffect(() => {
    if (favorite_movies === null) dispatch(getFavorites());
  }, [getFavorites]);

  const isMovieFavourite = useCallback((prop_movie) => {
    return favorite_movies.some((movie) => movie.id === prop_movie.id);
  }, [favorite_movies])

  return (
    <div className={classes["watchlist-category-container"]}>
      <h2>{props.name}</h2>
      <div className={classes["watchlist-category-list"]}>
        { !favorite_movies && notification?.status === "pending" && <SpinLoader />}
        { favorite_movies && notification?.status === "success" && props.movies.map(movie => <Movie  movie={movie} movies={props.movies} isFavorite={isMovieFavourite(movie)} key={movie.id}/>) }
        { favorite_movies && notification?.status === "pending" && props.movies.map(movie => <Movie  movie={movie} movies={props.movies} isFavorite={isMovieFavourite(movie)} key={movie.id}/>) }
      </div>
    </div>
    );
}

export default WatchlistList;
