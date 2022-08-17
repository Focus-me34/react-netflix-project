
import { ThumbsDownSharp, ThumbsUpSharp } from "react-ionicons";
import classes from "./WatchlistComment.module.css";

const WatchlistComment = (props) => {
  return (
    <div className={classes["comment-card"]}>
      <p className={classes["comment-username"]}>{props.review.username}</p>
      <p className={classes["comment-content"]}>{props.review.comment}</p>

      <div className={classes["comment-card-bottom"]}>
        <div className={classes["comment-likes-container"]}>
          <ThumbsUpSharp color={'#198754'} title={"thumbs-up"} height="40px" width="40px"/>
          <ThumbsDownSharp color={'#ff0000'} title={"thumbs-down"} height="40px" width="40px" />
        </div>

        <p className={classes["comment-date"]}>{new Date(props.review.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default WatchlistComment;

// #198754
