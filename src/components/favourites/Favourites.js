import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { getFavorites } from "../../lib/api";

import NavbarDetailed from "../navbar/NavbarDetailed";
import DisplayContent from "../UI/DisplayContent";
import FavoriteMovieList from "./FavoriteMovieList";
import Footer from "../footer/Footer";

const Favourites = () => {
  const { sendRequest, status, data: favorite_movies, error} = useFetch(getFavorites, true);
  const dispatch = useDispatch();

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);



  return (
    <>
      <NavbarDetailed />

      <DisplayContent type={"Favorite Movies"} description={"This is your favorite list. Easily add and remove movies from this list. You can a lso share your list or a specific movie to a friend from this section."}>
        { status === "completed" && <FavoriteMovieList movies={favorite_movies} /> }

        {error && <p>An error occured</p>}
        <Footer />
      </DisplayContent>
    </>
  );
};

export default Favourites;
