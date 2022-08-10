import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { getFavorites } from "../../lib/api";

import NavbarDetailed from "../navbar/NavbarDetailed";
import DisplayContent from "../UI/DisplayContent";
import FavoriteMovieList from "./FavoriteMovieList";
import Footer from "../footer/Footer";

const Favourites = () => {
  const { updatedFavMovieList } = useSelector((state) => state.movie);
  const { sendRequest, status, data: favorite_movies, error} = useFetch(getFavorites, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest, ]);

  const selectCorrectFavMovieList = () => {
    return !!updatedFavMovieList ? updatedFavMovieList : favorite_movies;
  }

  return (
    <>
      <NavbarDetailed />

      <DisplayContent type={"Favorite Movies"} description={"This is your favorite list. Easily add and remove movies from this list. You can a lso share your list or a specific movie to a friend from this section."}>
        { status === "completed" && <FavoriteMovieList movies={selectCorrectFavMovieList()} /> }

        {error && <p>An error occured</p>}
        <Footer />
      </DisplayContent>
    </>
  );
};

export default Favourites;
