import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import { getAllWatchlists } from "../../store/slices/MovieSlice";

import Button from "react-bootstrap/Button";

import classes from "./WatchListForm.module.css";
import btnClasses from "../UI/Buttons.module.css";


const WatchListForm = () => {
  const { allWatchlists: watchlists, notification, allWatchlists } = useSelector(state => state.movie)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllWatchlists());
  }, [getAllWatchlists]);


  const wl_name = useRef(null)
  const [showForm, setShowForm ] = useState(false)


  return (

    <div>
      { watchlists && (notification.satus === "success") &&
        <select name="watchlist-name" id="watchlist-name" ref={wl_name}>
          {watchlists.map((wl) => <option value={wl.name}></option>)}
        </select>
      }

      <Button>New Watchlist</Button>
      <Button type="button" className={btnClasses["btn-open-form"]} variant="danger">New Watchlist</Button>{' '}

      {showForm && <form></form>}
    </div>
  );
}

export default WatchListForm;
