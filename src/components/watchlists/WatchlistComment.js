
import { ThumbsDownSharp, ThumbsUpSharp } from "react-ionicons";
import classes from "./WatchlistComment.module.css";

const WatchlistComment = (props) => {
  return (
    <div className={classes["comment-card"]}>
      <p className={classes["comment-username"]}>{props.review.username}</p>
      <p className={classes["comment-content"]}>{props.review.comment}</p>

      <div className={classes["comment-card-bottom"]}>
        <div className={classes["comment-likes-container"]}>
          <div className={classes["likes-counter"]}>
            <p>{props.review.likes}</p>
            <ThumbsUpSharp color={'#198754'} title={"thumbs-up"} height="35px" width="35px"/>
          </div>

          <div className={classes["dislikes-counter"]}>
            <p>{props.review.dislikes}</p>
            <ThumbsDownSharp color={'#ff0000'} title={"thumbs-down"} height="35px" width="35px" />
          </div>
        </div>

        <p className={classes["comment-date"]}>{new Date(props.review.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default WatchlistComment;

// #198754
