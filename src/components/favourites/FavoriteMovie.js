import ReactDom from "react-dom";
import { useState } from "react";

import SeparationPattern from "../UI/SeparationPattern";
import { Backdrop } from "../UI/AuthModal";

import { Heart, Close, HeartOutline } from "react-ionicons";
import classes from "./FavoriteMovie.module.css"



// ! WHEN CLICKING ON A MOVIE, THIS MODAL POPS IN DISPLAYING THE INFORMATION OF THE SELECTED MOVIE.
const SelectedMovieInformation = (props) => {
  return (
    <>
      <div className={classes["favorite-movie-details"]} style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${props.movie.backdrop_path})`}}>
        <div className={classes["container-close-icon"]}>
          <Close onClick={props.unsetSelectedMovie} color={'#ffffff'} title={"close-icon"} height="25px" width="25px" />
        </div>
        <div>
          <p className={classes.title}>{props.movie.title}</p>
          <p className={classes.synopsis}>{props.movie.synopsis}</p>
          <div className={classes["bottom-card"]}>
            <p className={classes["release-date"]}>Release date: {props.movie.release_date}</p>
            <p className={classes["vote-average"]}>⭐️ {props.movie.vote_average}</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ! HAD TO CREATE THIS COMPONENT IN ORDER TO HANDLE THE FAVORITE ACTIONS INDIVIDUALY
// ! HEART ICON DISPLAYED WHEN HOVERING A MOVIE FOR THIS MOVIE ONLY, NOT ALL OF THEM.
const FavoriteMovie = (props) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isHover, setIsHover] = useState(false);
    const [isFavorite, setIsFavorite] = useState(true)

    const showDetailHandler = (id) => {
      if (selectedMovie?.id !== id) {
        setSelectedMovie(props.allMovies.filter((movie) => movie.id === id)[0]);
      } else {
        setSelectedMovie(null);
      }
    };

    const toggleShowActionIconHandler = () => {setIsHover((prevState) => !prevState)};

    const toggleFavouriteIcon = () => {
      setIsFavorite(prevState => !prevState);
      setIsHover((prevState) => !prevState);
    }

    const unsetSelectedMovieHandler = () => { setSelectedMovie(null) }

  return (
    <>
      <div onMouseEnter={toggleShowActionIconHandler} onMouseLeave={toggleShowActionIconHandler} className={classes["favorite-movie-card"]}>
        <div className={`${classes["container-action-icons"]} ${isHover ? classes.visible : classes.invisible }`}>
          { !isFavorite && <HeartOutline onClick={toggleFavouriteIcon} color={'#ff0000'} title={"like-button"} height="25px" width="25px" />}
          { isFavorite && <Heart onClick={toggleFavouriteIcon} color={'#ff0000'} title={"like-button"} height="25px" width="25px" />}
        </div>

        <img onClick={() => showDetailHandler(props.movie.id)} src={props.movie.poster_path} alt={`Poster image of movie: "${props.movie.title}"`} />
        <p onClick={() => showDetailHandler(props.movie.id)} className={classes.title}>{props.movie.title}</p>
      </div>

      { selectedMovie &&
        <>
          {ReactDom.createPortal(<Backdrop />, document.getElementById("backdrop"))}
          {ReactDom.createPortal(<SelectedMovieInformation unsetSelectedMovie={unsetSelectedMovieHandler} movie={selectedMovie} />, document.getElementById("movie-description"))}
        </>
      }
    </>
  );
}

export default FavoriteMovie;
