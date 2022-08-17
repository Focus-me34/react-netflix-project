import ReactDom from "react-dom";

import { useEffect, useCallback } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getWatchlist } from "../../store/slices/MovieSlice";
import { getFavorites } from "../../store/slices/MovieSlice";
import { getAllWatchlists } from "../../store/slices/MovieSlice";
import { selectMovie, unselectMovie } from "../../store/slices/MovieSlice";

import NavbarDetailed from "../navbar/NavbarDetailed";
import DisplayContent from "../UI/DisplayContent";
import Movie from "../movies/Movie";
import SpinLoader from "../UI/SpinLoader";
import Button from "react-bootstrap/Button";
import Backdrop from "../UI/Backdrop";
import WatchListForm from "./WatchListForm";
import SelectedMovieInformation from "../UI/SelectedMovieInformation";
import Footer from "../footer/Footer";

import classes from "../movies/MovieList.module.css";
import btnClasses from "../UI/Buttons.module.css";
import { useState } from "react";


const WatchlistShow = () => {
  const { allWatchlists, watchlist, reviews, watchlistMovies, watchlistCreator, isAddingToWatchlist, allFavorites, isSelectedMovie, selectedMovie, refreshWatchlist, notification } = useSelector(state => state.movie)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [showCommentSection, setShowCommentSection] = useState(false)


  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(refreshWatchlist);
  console.log(watchlistMovies);

  useEffect(() => {
    if (!allWatchlists) dispatch(getAllWatchlists());
    if (allFavorites === null) dispatch(getFavorites());
    if (refreshWatchlist) dispatch(getWatchlist(params.watchlistId));
;
  }, [watchlist, allWatchlists, getWatchlist, allFavorites, watchlistMovies]);

  useEffect(() => {
    dispatch(getWatchlist(params.watchlistId));

    if (!!location.pathname.match("comments") === true) setShowCommentSection(true);
    if (!!location.pathname.match("comments") === false) setShowCommentSection(false);
  }, [])


  const toggleCommentForm = () => {
    showCommentSection ? setShowCommentSection(false) : setShowCommentSection(true);
    // !!location.pathname.match("comments") ? navigate(`/watchlists/${params.watchlistId}`) : navigate(`${location.pathname}/comments`)
    !!location.pathname.match("comments") ? navigate(-1) : navigate(`${location.pathname}/comments`)
  }


  const isMovieFavourite = useCallback(
    (prop_movie) => {
      return allFavorites?.some((movie) => movie.id === prop_movie.id);
    },
    [allFavorites]
  );

  const isMovieInUserWatchlists = (mapped_movie) => {
    const userWatchlists = allWatchlists?.filter(wl => wl.user_id === user.id)
    let userAllWatchlistedMovies = []
    userWatchlists.map((wl) => userAllWatchlistedMovies.push(...wl.movies));

    return userAllWatchlistedMovies?.some((movie) => movie.id === mapped_movie.id);
  };

  const selectMovieHandler = (movie_id, movie) => {
    !isSelectedMovie ? dispatch(selectMovie({ movieId: movie_id, movie: movie })) : dispatch(unselectMovie());
  };

  const watchlistCreationDate = new Date(watchlist?.created_at).toLocaleDateString() || ""

  return (
    <>
      <NavbarDetailed />
      <DisplayContent type="Watchlist Detail" description="In this section, exchange your opinion regarding this watchlist with other users.">
        <div className={classes["movie-category-container"]}>
          <h2>{watchlist?.name || ""} - {`This watchlist was created by "${watchlistCreator || ""}" the ${watchlistCreationDate}`}</h2>

          <div className={classes["movie-category-list"]}>
            {(!watchlist || !reviews || !watchlistMovies || !allWatchlists) && <SpinLoader />}
            {(!watchlist || !reviews || !watchlistMovies|| !allWatchlists) && notification?.status === "pending" && <SpinLoader />}

            { allWatchlists && watchlist && reviews && watchlistMovies && notification?.status === "pending" && watchlistMovies.map(movie => <Movie movie={movie} movies={watchlistMovies} selectMovie={selectMovieHandler} isInWatchlist={isMovieInUserWatchlists(movie)} watchlistName={watchlist.name} isFavorite={isMovieFavourite(movie)} key={movie.id}/>) }
            { allWatchlists && watchlist && reviews && watchlistMovies && notification?.status === "success" && watchlistMovies.map(movie => <Movie movie={movie} movies={watchlistMovies} selectMovie={selectMovieHandler} isInWatchlist={isMovieInUserWatchlists(movie)} watchlistName={watchlist.name} isFavorite={isMovieFavourite(movie)} key={movie.id}/>) }

            { notification?.status === "error" && <p>An error occured while loadig the content of ths watchlist</p>}

          </div>
            <Button type="button" onClick={ toggleCommentForm } className={btnClasses["btn-watchlist-comment"]} variant="danger">{showCommentSection ? "Hide" : "Show"} comment section</Button>{' '}
        </div>

      <Outlet />
      <Footer></Footer>
      </DisplayContent>

      {isSelectedMovie && (
        <>
          {ReactDom.createPortal(
            <Backdrop />,
            document.getElementById("backdrop")
          )}
          {ReactDom.createPortal(
            <SelectedMovieInformation movie={selectedMovie} />,
            document.getElementById("movie-description")
          )}
        </>
      )}

      {isAddingToWatchlist && (
        <>
          { ReactDom.createPortal(<Backdrop />, document.getElementById("backdrop") )}
          { ReactDom.createPortal( <WatchListForm />, document.getElementById("watchlist-form-modal") )}
        </>
      )}

    </>
  );
}

export default WatchlistShow;
