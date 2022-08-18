import { useDispatch, useSelector } from "react-redux";
import { deleteReviewFromWatchlist } from "../../store/slices/MovieSlice";

import { ThumbsDownSharp, ThumbsUpSharp, CloseCircleOutline } from "react-ionicons";

import classes from "./WatchlistComment.module.css";

const WatchlistComment = (props) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();


  const deleteReviewHandler = (review_id) => {
    dispatch(deleteReviewFromWatchlist(review_id));
  }

  return (
    <div className={classes["comment-card"]}>
      <div className={classes["comment-card-top"]}>
        <p className={classes["comment-username"]}>{props.review.username}</p>
        { user.id === props.review.user_id && <CloseCircleOutline onClick={() => deleteReviewHandler(props.review.id)} color={'#ff0000'} title={"delete-review"} height="25px" width="25px" />}
        {/* { user.id !== props.review.user_id && <p></p>} */}
      </div>
      <p className={classes["comment-content"]}>{props.review.comment}</p>

      <div className={classes["comment-card-bottom"]}>
        <div className={classes["comment-likes-container"]}>
          <div className={classes["likes-counter"]}>
            <p>{props.review.likes}</p>
            <ThumbsUpSharp color={'#198754'} title={"thumbs-up"} height="25px" width="25px"/>
          </div>

          <div className={classes["dislikes-counter"]}>
            <p>{props.review.dislikes}</p>
            <ThumbsDownSharp color={'#ff0000'} title={"thumbs-down"} height="25px" width="35px" />
          </div>
        </div>

        <p className={classes["comment-date"]}>{new Date(props.review.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default WatchlistComment;

// #198754
