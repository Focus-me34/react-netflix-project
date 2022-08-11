import { useDispatch } from "react-redux";
import { getAllWatchlists } from "../../store/slices/MovieSlice";

import NavbarDetailed from "../navbar/NavbarDetailed";

const Watchlists = () => {
const dispatch = useDispatch();

  dispatch(getAllWatchlists()); // ! HERE

  return (
    <>
      <NavbarDetailed />
    </>
  );
}

export default Watchlists;
