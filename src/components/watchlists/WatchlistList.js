import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../store/slices/MovieSlice";
import { getAllWatchlists } from "../../store/slices/MovieSlice";
import { getArrayWithAllWatchlistedMovies } from "../movies/MovieList";

import Movie from "../movies/Movie";
import SpinLoader from "../UI/SpinLoader";
import Button from "react-bootstrap/Button";

import classes from "./WatchlistList.module.css";
import btnClasses from "../UI/Buttons.module.css";
import { useNavigate } from "react-router-dom";

const WatchlistList = (props) => {
  const { allFavorites: favorite_movies, notification, allWatchlists: watchlists } = useSelector(state => state.movie)
  const [allWatchlistedMovies, setAllWatchlistedMovies] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (watchlists === null) dispatch(getAllWatchlists());
    if (favorite_movies === null) dispatch(getFavorites());
    if (watchlists && allWatchlistedMovies === null) setAllWatchlistedMovies(getArrayWithAllWatchlistedMovies(watchlists));
  }, [getFavorites]);


  const isMovieFavourite = useCallback((prop_movie) => {
    return favorite_movies.some((movie) => movie.id === prop_movie.id);
  }, [favorite_movies])

  const isMovieInWatchlist = (prop_movie) => {
    return allWatchlistedMovies.some((movie) => movie.id === prop_movie.id);
  };

  return (
    <div className={classes["watchlist-category-container"]}>
      <h2>{props.name} <span className={classes["watchlist-creator"]}>(created by {props.creator})</span></h2>
      <div className={classes["watchlist-category-list"]}>
        { (!allWatchlistedMovies || !favorite_movies) && <SpinLoader /> }
        { favorite_movies && allWatchlistedMovies && notification?.status === "success" && props.movies.map(movie => <Movie movie={movie} movies={props.movies} isInWatchlist={isMovieInWatchlist(movie)} watchlistName={props.name} isFavorite={isMovieFavourite(movie)} key={movie.id}/>) }
        { favorite_movies && allWatchlistedMovies && notification?.status === "pending" && props.movies.map(movie => <Movie movie={movie} movies={props.movies} isInWatchlist={isMovieInWatchlist(movie)} watchlistName={props.name} isFavorite={isMovieFavourite(movie)} key={movie.id}/>) }
        { notification?.status === "error" && <p>An error occured. Try refreshing the page</p> }
      </div>

      {/* <Button type="button" onClick={ () => console.log("Open form modal to add a comment") } className={btnClasses["btn-watchlist-comment"]} variant="primary">Add comment</Button>{' '} */}
      <Button type="button" onClick={ () => navigate(`/watchlists/${props.watchlist_id}`) } className={btnClasses["btn-watchlist-comment"]} variant="secondary">See comments</Button>{' '}
    </div>
    );
}

export default WatchlistList;
