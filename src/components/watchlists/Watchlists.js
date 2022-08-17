import ReactDom from "react-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWatchlists } from "../../store/slices/MovieSlice";
import { Outlet } from "react-router-dom";

import NavbarDetailed from "../navbar/NavbarDetailed";
import WatchlistList from "./WatchlistList";
import DisplayContent from "../UI/DisplayContent";
import SpinLoader from "../UI/SpinLoader";
import Footer from "../footer/Footer";
import Backdrop from "../UI/Backdrop";
import WatchListForm from "./WatchListForm";
import SelectedMovieInformation from "../UI/SelectedMovieInformation";

import classes from "./Watchlists.module.css";
import { useParams } from "react-router-dom";

const Watchlists = () => {
  const { allWatchlists, isAddingToWatchlist, isSelectedMovie, selectedMovie, notification } = useSelector(state => state.movie)
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (allWatchlists === null) dispatch(getAllWatchlists());
  }, [getAllWatchlists]);

  const type = "Watchlist";
  const description = `Browse all the watchlists created by our users here. Fancy a movie night? Consider watching the suggested movie, and don't forget to leave a review!`

  return (
    <>
      <NavbarDetailed />
      <DisplayContent type={type} description={description}>
        {!allWatchlists && notification?.status === "pending" && <SpinLoader />}
        {allWatchlists && notification?.status === "pending" && allWatchlists.map((wl) => ( <WatchlistList watchlist_id={wl.id} name={wl.name} movies={wl.movies} creator={wl.created_by} key={wl.id} /> ))}
        {allWatchlists && notification?.status === "success" && allWatchlists.map((wl) => ( <WatchlistList watchlist_id={wl.id} name={wl.name} movies={wl.movies} creator={wl.created_by} key={wl.id} /> ))}
        {allWatchlists?.length === 0 && notification?.status === "success" && (<p className={classes["no-favorite-movie-msg"]}>You didn't create any watchlist yet! Browse the "Movies" category and try adding one !{" "}</p> )}
        {notification?.status === "error" && ( <p>AN ERROR OCCURED WHILE LOADING THE WAHCTHLISTS</p> )}

        <Outlet />
      </DisplayContent>
      <Footer />

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
          {ReactDom.createPortal(
            <Backdrop />,
            document.getElementById("backdrop")
          )}
          {ReactDom.createPortal(
            <WatchListForm />,
            document.getElementById("watchlist-form-modal")
          )}
        </>
      )}
    </>
  );
}

export default Watchlists;
