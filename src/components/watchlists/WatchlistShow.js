import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import btnClasses from "../UI/Buttons.module.css";



const WatchlistShow = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(params.watchlistId);
  console.log(params);

  const toggleCommentForm = () => {
    // !!location.pathname.match("comments") ? navigate(`/watchlists/${params.watchlistId}`) : navigate(`${location.pathname}/comments`)
    !!location.pathname.match("comments") ? navigate(-1) : navigate(`${location.pathname}/comments`)
  }

  return (
    <>
      <p>This is the watchlist show</p>
      <Button type="button" onClick={ toggleCommentForm } className={btnClasses["btn-watchlist-comment"]} variant="primary">Add comment</Button>{' '}

      <Outlet />
    </>
  );
}

export default WatchlistShow;
