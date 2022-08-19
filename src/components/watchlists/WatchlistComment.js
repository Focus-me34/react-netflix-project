import { useDispatch, useSelector } from "react-redux";
import { deleteReviewFromWatchlist } from "../../store/slices/MovieSlice";
import { updateLikeReview, updateDislikeReview } from "../../store/slices/MovieSlice";

import ReviewEditForm from "./ReviewEditForm";
import { ThumbsDownSharp, ThumbsUpSharp, ThumbsUpOutline, ThumbsDownOutline, CreateOutline, CloseCircleOutline } from "react-ionicons";

import classes from "./WatchlistComment.module.css";
import { useState } from "react";

const didUserLikedReview = (likedReviewsArr, currentReview) => {
  return likedReviewsArr.some((review) => review.review_id === currentReview.id) ? true : false;
}

const didUserDislikedReview = (dislikedReviewsArr, currentReview) => {
  return dislikedReviewsArr.some((review) => review.review_id === currentReview.id) ? true : false;
}


const WatchlistComment = (props) => {
  const user = useSelector(state => state.auth.user);
  const { reviewLikes, reviewDislikes, notification} = useSelector(state => state.movie);
  const dispatch = useDispatch();

  const [ showEditInput, setShowEditInput ] = useState(false);
  const [liked, setLiked] = useState(didUserLikedReview(reviewLikes, props.review));
  const [disliked, setDisliked] = useState(didUserDislikedReview(reviewDislikes, props.review));


  const deleteReviewHandler = (review_id) => {
    dispatch(deleteReviewFromWatchlist(review_id));
  }

  const showEditInputHandler = () => {
    setShowEditInput(true);
  }

  const hideEditInputHandler = () => {
    setShowEditInput(false);
  };

  // ! LIKE / DISLIKE ACTIONS
  const likeReviewHandler = (action) => {
    dispatch(updateLikeReview(props.review, action));
  }

  const dislikeReviewHandler = (action) => {
    dispatch(updateDislikeReview(props.review, action));
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
            { liked && <ThumbsUpSharp onClick={() => likeReviewHandler("unliked")} color={'#198754'} title={"thumbs-up"} height="25px" width="25px"/>}
            { !liked && <ThumbsUpOutline onClick={() => likeReviewHandler("liked")} color={'#198754'} title={"thumbs-up"} height="25px" width="25px"/>}
          </div>

          <div className={classes["dislikes-counter"]}>
            <p>{props.review.dislikes_counter}</p>
            {/* <ThumbsDownSharp color={'#ff0000'} title={"thumbs-down"} height="25px" width="25px" /> */}
            { disliked && <ThumbsDownSharp onClick={() => dislikeReviewHandler("undisliked")} color={'#ff0000'} title={"thumbs-down"} height="25px" width="25px" />}
            { !disliked &&<ThumbsDownOutline onClick={() => dislikeReviewHandler("disliked")} color={'#ff0000'} title={"thumbs-down"} height="25px" width="25px" />}
          </div>
        </div>

        <p className={classes["comment-date"]}>{new Date(props.review.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default WatchlistComment;
