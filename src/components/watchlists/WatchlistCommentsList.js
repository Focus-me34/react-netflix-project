import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addReviewToWatchlist } from "../../store/slices/MovieSlice";

import SpinLoader from "../UI/SpinLoader";
import Button from "react-bootstrap/Button";
import WatchlistComment from "./WatchlistComment";

import classes from "./WatchlistCommentsList.module.css"
import btnClasses from "../UI/Buttons.module.css"

const WatchlistCommentsList = () => {
  const { watchlist, reviews, notification } = useSelector(state => state.movie)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [isReviewInputValid, setIsReviewInputValid] = useState(false)
  const reviewInputRef = useRef("")
  // console.log(user);

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(addReviewToWatchlist(watchlist.id, reviewInputRef.current.value));
  }


  const validateReviewInputHandler = () => {
    reviewInputRef.current.value !== "" ? setIsReviewInputValid(true) : setIsReviewInputValid(false);
  }

  return (
    <div className={classes["watchlist-comment-section"]}>

      <form onSubmit={submitReviewHandler} id="add-review-form" className={classes["add-review-form"]}>
        {/* <input type="hidden" value={user.username} disabled/> */}
        <input onChange={validateReviewInputHandler} type="text" placeholder="Write your review..." ref={reviewInputRef} />
        <Button type="submit" form="add-review-form" disabled={!isReviewInputValid} className={btnClasses["btn-add-review"]} variant="dark">Submit Review</Button>{' '}
      </form>

      {!reviews || !watchlist && <SpinLoader /> }
      {/* { !reviews && notification?.status === "pending" && <SpinLoader /> } */}
      { reviews && notification?.status === "pending" && reviews.map((review) => ( <WatchlistComment review={review} key={review.id} /> )) }
      { reviews && notification?.status === "success" && reviews.map((review) => ( <WatchlistComment review={review} key={review.id} /> )) }
      { notification?.status === "error" && <p>An error occured while loading the comments... Try refreshing the page</p> }
    </div>
  );
}

export default WatchlistCommentsList;


// GET ALL REVIEWS FOR THE SPECIFIED WATCHLIST
