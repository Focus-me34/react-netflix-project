import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSelectMovieHandler } from "../../store/slices/MovieSlice";


import { Heart, HeartOutline } from "react-ionicons";
import favClasses from "../favourites/FavoriteMovie.module.css"
import movieListClasses from "./MovieList.module.css"


const Movie = (props) => {
  const { isSelectedMovie, movieId } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);

  // useEffect(() => {
  //   sendRequest();
  //   if (status === "completed") {
  //     setIsFavorite(favorite_movies.find((movie) => movie === props.movie));
  //   }
  // }, [sendRequest, status]);

  const setFavorite = (movie_id) => {
    console.log(movie_id);
    setIsFavorite(true);
    setIsHover((prevState) => !prevState);
    props.addFavorite(movie_id)
    // dispatch(addFavoriteMovie(movie_id));
  };

  const unsetFavorite = (movie_id) => {
    setIsFavorite(false);
    setIsHover((prevState) => !prevState);
    props.removeFavorite(movie_id);
  };

  return (
    <div onClick={() => dispatch(toggleSelectMovieHandler)} key={props.movie.id} className={movieListClasses["movie-card"]}>
      <div className={`${favClasses["container-action-icons"]} ${isHover ? movieListClasses.visible : movieListClasses.invisible }`}>
        { !isFavorite && <HeartOutline onClick={() => setFavorite(props.movie.id)} color={'#ff0000'} title={"like-button"} height="25px" width="25px" />}
        { isFavorite && <Heart onClick={() => unsetFavorite(props.movie.id)} color={'#ff0000'} title={"like-button"} height="25px" width="25px" />}
      </div>

      <img src={props.movie.poster_path} alt="image of movie: movie.title" />
      <p className={props.movie.id === movieId ? movieListClasses.active : ""}>{props.movie.title}</p>
    </div>
  );
}

export default Movie;
