import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWatchlists } from "../../store/slices/MovieSlice";

import NavbarDetailed from "../navbar/NavbarDetailed";
import WatchlistList from "./WatchlistList";
import DisplayContent from "../UI/DisplayContent";
import SpinLoader from "../UI/SpinLoader";
import Footer from "../footer/Footer";

import classes from "./Watchlists.module.css";

const Watchlists = () => {
  const { allWatchlists, notification } = useSelector(state => state.movie)
  const dispatch = useDispatch();

  useEffect(() => {
    if (allWatchlists === null) dispatch(getAllWatchlists());
  }, [getAllWatchlists]);

  const type = "Watchlist";
  const description = `Have a look at all the checklists you've created. Fancy a movie night, consider watching the suggested one, and don't forget to leave a review!`

  console.log(allWatchlists);
  return (
    <>
      <NavbarDetailed />
      <DisplayContent type={type} description={description}>
        { !allWatchlists && notification?.status === "pending" && <SpinLoader /> }
        { allWatchlists && notification?.status === "pending" && allWatchlists.map(wl => <WatchlistList name={wl.name} movies={wl.movies} key={wl.id}/>) }
        { allWatchlists && notification?.status === "success" && allWatchlists.map(wl => <WatchlistList name={wl.name} movies={wl.movies} key={wl.id}/>) }
        { (allWatchlists?.length === 0) && notification?.status === "success" && <p  className={classes["no-favorite-movie-msg"]}>You didn't create any watchlist yet! Browse the "Movies" category and try adding one ! </p> }
        { !allWatchlists && notification?.status === "error" && <p>AN ERROR OCCURED WHILE LOADING THE WAHCTHLISTS</p> }
        <Footer />
      </DisplayContent>
    </>
  );
}

export default Watchlists;
