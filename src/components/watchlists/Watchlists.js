import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWatchlists } from "../../store/slices/MovieSlice";

import NavbarDetailed from "../navbar/NavbarDetailed";
import WatchlistList from "./WatchlistList";
import DisplayContent from "../UI/DisplayContent";
import SpinLoader from "../UI/SpinLoader";

const Watchlists = () => {
  const { allWatchlists, notification } = useSelector(state => state.movie)
  const dispatch = useDispatch();

  useEffect(() => {
    if (allWatchlists === null) dispatch(getAllWatchlists());
  }, [getAllWatchlists]);

  const type = "Watchlist";
  const description = `Have a look at all the checklists you've created. Fancy a movie night, consider watching the suggested one, and don't forget to leave a review!`

  return (
    <>
      <NavbarDetailed />
      <DisplayContent type={type} description={description}>
        { !allWatchlists && notification?.status === "pending" && <SpinLoader /> }
        { allWatchlists && notification?.status === "pending" && allWatchlists.map(wl => <WatchlistList name={wl.name} movies={wl.movies} key={wl.id}/>) }
        { allWatchlists && notification?.status === "success" && allWatchlists.map(wl => <WatchlistList name={wl.name} movies={wl.movies} key={wl.id}/>) }
        { !allWatchlists && notification?.status === "error" && <p>AN ERROR OCCURED WHILE LOADING THE WAHCTHLISTS</p> }
      </DisplayContent>
    </>
  );
}

export default Watchlists;
