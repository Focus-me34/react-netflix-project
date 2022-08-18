import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateReview } from "../../store/slices/MovieSlice";

import { ArrowBack, CheckmarkDone } from "react-ionicons";
import classes from "./ReviewEditForm.module.css";

const ReviewEditForm = (props) => {
  const dispatch = useDispatch();
  const [isEditReviewInputValid, setIsEditReviewInputValid ] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const inputEdit = useRef("");

  const validateEditReviewInputHandler = (e) => {
    if (inputEdit.current.value !== "" && inputEdit.current.value.trim().length >= 3) {
      setIsEditReviewInputValid(true);
      setShowErrorMessage(false);
    } else {
      setIsEditReviewInputValid(false);
    }

    if (e.key === "Enter") editReviewSubmitHandler(e);
    console.log(isEditReviewInputValid);
  }

  const editReviewSubmitHandler = (e) => {
    e.preventDefault();
    if (isEditReviewInputValid) {
      dispatch(updateReview(props.review, { comment: inputEdit.current.value }));
      props.hideInput();
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <form onSubmit={editReviewSubmitHandler} id="edit-review-form" className={classes["update-review-form"]}>
      <textarea onKeyDown={validateEditReviewInputHandler} required placeholder="Edit your review..." onChange={validateEditReviewInputHandler} rows="2" type="text" size="10" defaultValue={props.previous_comment} ref={inputEdit} />
      { showErrorMessage && <p className={classes["edit-review-error-message"]}>* Make sure the review contains at least 3 characters</p>}

      <div className={classes["edit-actions-container"]}>
        <CheckmarkDone type="submit" form="edit-review-form" onClick={editReviewSubmitHandler} color={'#198754'} title={"accept-changes-edit"} height="45px" width="45px" />
        <ArrowBack onClick={() => props.hideInput()} color={'#ff0000'} title={"exit-changes-edit"} height="45px" width="45px" />
      </div>
    </form>
  );
};

export default ReviewEditForm;
