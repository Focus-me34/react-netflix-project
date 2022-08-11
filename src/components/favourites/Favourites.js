import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFavorites } from "../../store/slices/MovieSlice";

import NavbarDetailed from "../navbar/NavbarDetailed";
import DisplayContent from "../UI/DisplayContent";
import FavoriteMovieList from "./FavoriteMovieList";
import Footer from "../footer/Footer";

const Favourites = () => {
  const { allFavorites: favorite_movies, updatedFavMovieList, notification } = useSelector((state) => state.movie);
  const dispatch = useDispatch()

  useEffect(() => {
    if (favorite_movies === null) dispatch(getFavorites());
  }, [getFavorites, favorite_movies]);

  console.log(favorite_movies);
  return (
    <>
      <NavbarDetailed />

      <DisplayContent type={"Favorite Movies"} description={"This is your favorite list. Easily add and remove movies from this list. You can a lso share your list or a specific movie to a friend from this section."}>
        { favorite_movies && notification.status === "success" && <FavoriteMovieList movies={favorite_movies} /> }
        { favorite_movies && notification.status === "pending" && <FavoriteMovieList movies={favorite_movies} /> }
        {!favorite_movies && notification?.error && <p>An error occured</p>}
        <Footer />
      </DisplayContent>
    </>
  );
};

export default Favourites;
