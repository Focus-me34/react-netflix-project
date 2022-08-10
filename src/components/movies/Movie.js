import { useState } from "react";
import { useSelector } from "react-redux";

import { Heart, HeartOutline } from "react-ionicons";
import favClasses from "../favourites/FavoriteMovie.module.css"
import classes from "./MovieList.module.css";
import movieListClasses from "./MovieList.module.css"


const Movie = (props) => {
  const { movieId } = useSelector((state) => state.movie);
  const [isHover, setIsHover] = useState(false);
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);

  const setFavorite = (movie_id) => {
    setIsFavorite(true);
    setIsHover((prevState) => !prevState);
    props.addFavorite(movie_id)
  };

  const unsetFavorite = (movie_id) => {
    setIsFavorite(false);
    setIsHover((prevState) => !prevState);
    props.removeFavorite(movie_id);
  };

  const toggleShowActionIconHandler = () => {setIsHover((prevState) => !prevState)};

  return (
    <div key={props.movie.id} onMouseEnter={toggleShowActionIconHandler} onMouseLeave={toggleShowActionIconHandler} className={movieListClasses["movie-card"]}>
      <div className={`${favClasses["container-action-icons"]} ${isHover  || isFavorite ? favClasses.visible : favClasses.invisible }`}>
        { !isFavorite && <HeartOutline onClick={() => setFavorite(props.movie.id)} color={'#ff0000'} title={"like-button"} height="50px" width="50px" />}
        { isFavorite && <Heart onClick={() => unsetFavorite(props.movie.id)} color={'#ff0000'} title={"like-button"} height="50px" width="50px" />}
      </div>

      <img onClick={() => props.selectMovie(props.movie.id, props.movie)} src={props.movie.poster_path} alt="image of movie: movie.title" />
      <p onClick={() => props.selectMovie(props.movie.id, props.movie)} className={props.movie.id === movieId ? movieListClasses.active : ""}>{props.movie.title}</p>
    </div>
  );
}

export default Movie;
