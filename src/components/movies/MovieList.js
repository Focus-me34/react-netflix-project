import { useReducer, useRef, useEffect } from "react";

import SeparationPattern from "../UI/SeparationPattern";
import classes from "./MovieList.module.css";


// ? REDUCER INITIAL STATE + HANDLER
const initialState = { isSelectedMovie: false, selectedMovie: null, movieId: null }
const selectMovieReducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      return { isSelectedMovie: true, selectedMovie: action.movies[action.movieId - 1], movieId: action.movieId }
    case "UNSELECT":
      return { isSelectedMovie: false, selectedMovie: null }
    default:
      break;
  }
}


const MovieList = (props) => {

  const [movieState, dispatch] = useReducer(selectMovieReducer, initialState);
  const video = useRef(null);

  const toggleSelectMovieHandler = (id) => {
    if (!movieState.isSelectedMovie) {
      dispatch({ type: "SELECT", movieId: id, movies: props.movies })
    } else {
      if (movieState.movieId === id) {
        dispatch({ type: "UNSELECT" })
      } else {
        dispatch({ type: "SELECT", movieId: id, movies: props.movies })
      }
    }
  }

  useEffect(() => {
    if (movieState.isSelectedMovie) video.current.volume = 0.1
  }, [movieState.isSelectedMovie])

  return (
    <div className={classes["movie-category-container"]}>
      <h2>{props.genre}</h2>
      <div className={classes["movie-category-list"]}>
        {props.movies.map(movie => {
          return (
            <div onClick={() => toggleSelectMovieHandler(movie.id)} key={movie.id} className={classes["movie-card"]}>
              <img src={movie.img_url} alt="image of movie: movie.title" />
              <p className={movie.id === movieState.movieId ? classes.active : ""}>{movie.title}</p>
            </div>
          )
        })}
      </div>

      {movieState.isSelectedMovie &&
        <>
          <SeparationPattern />
          <div className={classes["movie-details"]}>
            <p><span className={classes.synopsis}>Synopsis:</span> <br />{movieState.selectedMovie.synopsis}</p>
            <video ref={video} controls autoPlay width="500" src={movieState.selectedMovie.trailer_url}>
              <source src={movieState.selectedMovie.trailer_url} type="video/mp4" />
            </video>
          </div>
          <SeparationPattern />
        </>
      }
    </div>
  );
}

export default MovieList;
