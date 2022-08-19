import { useDispatch, useSelector } from "react-redux";
import { deleteReviewFromWatchlist } from "../../store/slices/MovieSlice";


import ReviewEditForm from "./ReviewEditForm";
import { ThumbsDownSharp, ThumbsUpSharp, CreateOutline, CloseCircleOutline } from "react-ionicons";

import classes from "./WatchlistComment.module.css";
import { useState } from "react";

const WatchlistComment = (props) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [ showEditInput, setShowEditInput ] = useState(false);


  const deleteReviewHandler = (review_id) => {
    dispatch(deleteReviewFromWatchlist(review_id));
  }

  const showEditInputHandler = () => {
    setShowEditInput(true);
  }

  const hideEditInputHandler = () => {
    setShowEditInput(false);
  };

  return (
    <div className={classes["comment-card"]}>
      <div className={classes["comment-card-top"]}>
        <p className={classes["comment-username"]}>{props.review.username}</p>
        <div className={classes["review-actions-container"]}>
          { user.id === props.review.user_id && <CreateOutline onClick={ showEditInputHandler } color={'#198754'} title={"edit-review"} height="25px" width="25px"/> }
          { user.id === props.review.user_id && <CloseCircleOutline onClick={() => deleteReviewHandler(props.review.id)} color={'#ff0000'} title={"delete-review"} height="25px" width="25px" />}
        </div>
      </div>
      { !showEditInput && <p className={classes["comment-content"]}>{props.review.comment}</p>}
      { showEditInput && <ReviewEditForm review={props.review} previous_comment={props.review.comment} hideInput={hideEditInputHandler} />}

      <div className={classes["comment-card-bottom"]}>
        <div className={classes["comment-likes-container"]}>
          <div className={classes["likes-counter"]}>
            <p>{props.review.likes_counter}</p>
            <ThumbsUpSharp color={'#198754'} title={"thumbs-up"} height="25px" width="25px"/>
          </div>

          <div className={classes["dislikes-counter"]}>
            <p>{props.review.dislikes_counter}</p>
            <ThumbsDownSharp color={'#ff0000'} title={"thumbs-down"} height="25px" width="25px" />
          </div>
        </div>

        <p className={classes["comment-date"]}>{new Date(props.review.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default WatchlistComment;

// #198754
