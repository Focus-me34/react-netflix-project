import { useState } from "react";
import { useDispatch } from "react-redux";

import { Heart } from "react-ionicons";
import classes from "./FavoriteMovie.module.css"
import { selectMovie } from "../../store/slices/MovieSlice";
import { removeFavoriteMovie } from "../../store/slices/MovieSlice";

// ! HAD TO CREATE THIS COMPONENT IN ORDER TO HANDLE THE FAVORITE ACTIONS INDIVIDUALY
// ! HEART ICON DISPLAYED WHEN HOVERING A MOVIE FOR THIS MOVIE ONLY, NOT ALL OF THEM.
const FavoriteMovie = (props) => {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true)

  const toggleShowActionIconHandler = () => {setIsHover((prevState) => !prevState)};

  const toggleFavouriteIcon = () => {
    setIsFavorite(prevState => !prevState);
    setIsHover((prevState) => !prevState);
    dispatch(removeFavoriteMovie(props.movie.id));
  }

  return (
    <div onMouseEnter={toggleShowActionIconHandler} onMouseLeave={toggleShowActionIconHandler} className={classes["favorite-movie-card"]}>
      <div className={`${classes["container-action-icons"]} ${isHover ? classes.visible : classes.invisible }`}>
        { isFavorite && <Heart onClick={toggleFavouriteIcon} color={'#ff0000'} title={"like-button"} height="25px" width="25px" />}
      </div>

      <img onClick={() => dispatch(selectMovie({movieId: props.movie.id, movie: props.movie}))} src={props.movie.poster_path} alt={`Poster image of movie: "${props.movie.title}"`} />
      <p onClick={() => dispatch(selectMovie({movieId: props.movie.id, movie: props.movie}))} className={classes.title}>{props.movie.title}</p>
    </div>
  );
}

export default FavoriteMovie;
