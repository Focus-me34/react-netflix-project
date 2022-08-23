import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addFavoriteMovie, deleteMovieFromWatchlist ,openWatchlistForm } from "../../store/slices/MovieSlice";
import { removeFavoriteMovie } from "../../store/slices/MovieSlice";

import { Heart, HeartOutline, Stopwatch, StopwatchOutline } from "react-ionicons";
import favClasses from "../favourites/FavoriteMovie.module.css"

import movieListClasses from "./MovieList.module.css"


const Movie = (props) => {
  const { movieId } = useSelector( (state) => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);
  const [isFavorite, setIsFavorite] = useState(props.isFavorite)
  const [isInWatchlist, setIsInWatchlist] = useState(props.isInWatchlist)

  const addFavorite = (movie_id) => { dispatch(addFavoriteMovie(movie_id)); };
  const removeFavorite = (movie_id) => { dispatch(removeFavoriteMovie(movie_id)); };


  const setFavorite = (movie_id) => {
    setIsFavorite(true);
    setIsHover((prevState) => !prevState);
    addFavorite(movie_id)
  };

  const unsetFavorite = (movie_id) => {
    setIsFavorite(false);
    setIsHover((prevState) => !prevState);
    removeFavorite(movie_id);
  };


  // ! THIS METHOD TRIGERS THE OPENING OF THE MODAL INSIDE "MOVIES.JS"
  const openWatchlistModal = (movie, movie_id) => { dispatch(openWatchlistForm({ movie: movie, movie_id: movie_id })) };

  const removeFromWatchlistHandler = (movie_id) => {
    setIsInWatchlist(false);
    setIsHover((prevState) => !prevState);
    dispatch(deleteMovieFromWatchlist(movie_id));
  }

  const toggleShowActionIconHandler = () => {setIsHover((prevState) => !prevState)};

  return (
    <div key={props.movie.id} onMouseEnter={toggleShowActionIconHandler} onMouseLeave={toggleShowActionIconHandler} className={movieListClasses["movie-card"]}>

      <div className={`${favClasses["container-action-icons"]}`}>
        { !isInWatchlist && <StopwatchOutline className={`${isHover ? favClasses.visible : favClasses.invisible }`} onClick={ () => openWatchlistModal(props.movie, props.movie.id) } color={'#fa0000'} title={"add-to-watchlist"} height="50px" width="50px"/>}
        { isInWatchlist && <Stopwatch className={`${isInWatchlist ? favClasses.visible : favClasses.invisible}`} onClick={ () => removeFromWatchlistHandler(props.movie.id) } color={'#e100ff'} title={"check-watchlist"} height="50px" width="50px"/>}

        { !isFavorite && <HeartOutline  className={`${isHover ? favClasses.visible : favClasses.invisible }`} onClick={() => setFavorite(props.movie.id)} color={'#ff0000'} title={"like-button"} height="50px" width="50px" />}
        { isFavorite && <Heart className={`${isFavorite ? favClasses.visible : favClasses.invisible}`} onClick={() => unsetFavorite(props.movie.id)} color={'#ff0000'} title={"like-button"} height="50px" width="50px" />}
      </div>

      { <img onClick={() => props.selectMovie(props.movie.id, props.movie)} src={props.movie.poster_path} alt={`image of movie: ${props.movie.title}`} /> }
      <p onClick={() => props.selectMovie(props.movie.id, props.movie)} className={props.movie.id === movieId ? movieListClasses.active : ""}>{props.movie.title}</p>
    </div>
  );
}

export default Movie;
