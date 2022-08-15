import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getWatchlist } from "../../store/slices/MovieSlice";
import { getFavorites } from "../../store/slices/MovieSlice";
import { getAllWatchlists } from "../../store/slices/MovieSlice";
import { getArrayWithAllWatchlistedMovies } from "../movies/MovieList";

import NavbarDetailed from "../navbar/NavbarDetailed";
import DisplayContent from "../UI/DisplayContent";
import Movie from "../movies/Movie";
import SpinLoader from "../UI/SpinLoader";
import Button from "react-bootstrap/Button";

// import classes from "../watchlists/WatchlistList.module.css";
import classes from "../movies/MovieList.module.css";
import btnClasses from "../UI/Buttons.module.css";


const WatchlistShow = () => {
  const { watchlist, reviews, watchlistMovies, watchlistCreator, allFavorites, notification } = useSelector(state => state.movie)
  const dispatch = useDispatch();
  const [allWatchlistedMovies, setAllWatchlistedMovies] = useState(null);

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

console.log(watchlistMovies);

  useEffect(() => {
    if (!watchlist) dispatch(getWatchlist(params.watchlistId));
    if (allFavorites === null) dispatch(getFavorites());
    if (watchlistMovies && allWatchlistedMovies === null) setAllWatchlistedMovies(watchlistMovies);
  }, [getWatchlist]);

  const toggleCommentForm = () => {
    // !!location.pathname.match("comments") ? navigate(`/watchlists/${params.watchlistId}`) : navigate(`${location.pathname}/comments`)
    !!location.pathname.match("comments") ? navigate(-1) : navigate(`${location.pathname}/comments`)
  }

  console.log(watchlist);
  console.log(reviews);
  console.log(watchlistMovies);

  const isMovieFavourite = useCallback(
    (prop_movie) => {
      return allFavorites.some((movie) => movie.id === prop_movie.id);
    },
    [allFavorites]
  );

  const isMovieInWatchlist = (prop_movie) => {
    return allWatchlistedMovies?.some((movie) => movie.id === prop_movie.id);
  };

  const watchlistCreationDate = new Date(watchlist?.created_at).toLocaleDateString() || ""

  return (
    <>
      <NavbarDetailed />
      <DisplayContent type="Watchlist Detail" description="In this section, exchange your opinion regarding this watchlist with other users.">
        <div className={classes["movie-category-container"]}>
          <h2>{watchlist?.name || ""} - {`This watchlist was created by "${watchlistCreator || ""}" the ${watchlistCreationDate}`}</h2>

          <div className={classes["movie-category-list"]}>
            {(!watchlist || !reviews || !watchlistMovies) && <SpinLoader />}
            {(!watchlist || !reviews || !watchlistMovies) && notification?.status === "pending" && <SpinLoader />}

            { watchlist && reviews && watchlistMovies && notification?.status === "pending" && watchlistMovies.map(movie => <Movie movie={movie} movies={watchlistMovies} isInWatchlist={isMovieInWatchlist(movie)} watchlistName={watchlist.name} isFavorite={isMovieFavourite(movie)} key={movie.id}/>) }
            { watchlist && reviews && watchlistMovies && notification?.status === "success" && watchlistMovies.map(movie => <Movie movie={movie} movies={watchlistMovies} isInWatchlist={isMovieInWatchlist(movie)} watchlistName={watchlist.name} isFavorite={isMovieFavourite(movie)} key={movie.id}/>) }

            { notification?.status === "error" && <p>An error occured while loadig the content of ths watchlist</p>}

          </div>
            <Button type="button" onClick={ toggleCommentForm } className={btnClasses["btn-watchlist-comment"]} variant="danger">Add comment</Button>{' '}
        </div>
      </DisplayContent>
      <Outlet />
    </>
  );
}

export default WatchlistShow;
