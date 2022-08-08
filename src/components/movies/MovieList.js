import { useReducer, useRef, useEffect } from "react";

import SeparationPattern from "../UI/SeparationPattern";
import classes from "./MovieList.module.css";


// ? REDUCER INITIAL STATE + HANDLER
const selectMovieReducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      return { isSelectedMovie: true, selectedMovie: state.allMovies[action.movieId - 1], movieId: action.movieId, allMovies: state.allMovies }
    case "UNSELECT":
      return { isSelectedMovie: false, selectedMovie: null, movieId: null, allMovies: state.allMovies }
    default:
      break;
  }
}


const MovieList = (props) => {

  const [movieState, dispatch] = useReducer(selectMovieReducer, { isSelectedMovie: false, selectedMovie: null, movieId: null, allMovies: props.allMovies });
  // const video = useRef(null);
  console.log(props.movies);

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

  return (
    <div className={classes["movie-category-container"]}>
      <h2>Most Popular Movies - Rank: {props.rank}</h2>
      <div className={classes["movie-category-list"]}>
        {props.movies.map(movie => {
          return (
            <div onClick={() => toggleSelectMovieHandler(movie.id)} key={movie.id} className={classes["movie-card"]}>
              <img src={movie.poster_path} alt="image of movie: movie.title" />
              <p className={movie.id === movieState.movieId ? classes.active : ""}>{movie.title}</p>
            </div>
          )
        })}
      </div>

      {movieState.isSelectedMovie &&
        <>
          <SeparationPattern />
          {console.log(movieState.selectedMovie)}
          <div className={classes["movie-details"]} style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${movieState.selectedMovie.backdrop_path})`}}>
            <div>
              <p className={classes.title}>{movieState.selectedMovie.title}</p>
              <p className={classes.synopsis}>{movieState.selectedMovie.synopsis}</p>

              <div className={classes["bottom-card"]}>
                  <p className={classes["release-date"]}>Release date: {movieState.selectedMovie.release_date}</p>
                  <p className={classes["vote-average"]}>⭐️ {movieState.selectedMovie.vote_average}</p>
              </div>
            </div>
          </div>
          <SeparationPattern />
        </>
      }
    </div>
  );
}

export default MovieList;


// ? MANAGE THE VOLUME OF THE VIDEO
// useEffect(() => {
//   if (movieState.isSelectedMovie) video.current.volume = 0.1;
// }, [movieState.isSelectedMovie]);

// ? DIFFERENT SECTION BEING DISPLAED WITH THE TRAILER VIDEO FOR THE SELECTED MOVIE. CHANGED THE API SO DON'T HAVE IT ANYMORE
// <SeparationPattern />
// <div className={classes["movie-details"]}>
//   <p><span className={classes.synopsis}>Synopsis:</span> <br />{movieState.selectedMovie.synopsis}</p>
//   <video ref={video} controls autoPlay width="500" src={movieState.selectedMovie.trailer_url}>
//     <source src={movieState.selectedMovie.trailer_url} type="video/mp4" />
//   </video>
// </div>
// <SeparationPattern />
