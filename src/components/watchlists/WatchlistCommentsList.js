import { useSelector } from "react-redux";
import SpinLoader from "../UI/SpinLoader";
import WatchlistComment from "./WatchlistComment";

import classes from "./WatchlistCommentsList.module.css"

const WatchlistCommentsList = () => {
  const { watchlist, reviews, notification } = useSelector(state => state.movie)


  return (
    <div className={classes["watchlist-comment-section"]}>
      { !reviews && notification?.status === "pending" && <SpinLoader /> }
      { reviews && notification?.status === "success" && reviews.map(review => <WatchlistComment review={review} key={review.id}/>) }

      { notification?.status === "error" && <p>An error occured while loading the comments... Try refreshing the page</p> }
    </div>
  );
}

export default WatchlistCommentsList;


// GET ALL REVIEWS FOR THE SPECIFIED WATCHLIST
