import ReactDom from "react-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMovie, unselectMovie } from "../../store/slices/MovieSlice";
import useFetch from "./../../hooks/useFetch"

import { getMovies } from "../../lib/api";
import { addFavoriteMovie } from "../../store/slices/MovieSlice";
import { removeFavoriteMovie } from "../../store/slices/MovieSlice";

import NavbarDetailed from "../navbar/NavbarDetailed";
import DisplayContent from "../UI/DisplayContent";
import MovieList from "./MovieList";
import SelectedMovieInformation from "../UI/SelectedMovieInformation";
import Backdrop from "../UI/Backdrop";
import Footer from "../footer/Footer";


const Movies = () => {
  const { sendRequest, status, data: movies, error} = useFetch(getMovies, true);
  const dispatch = useDispatch();

  const { isSelectedMovie, movieId } = useSelector((state) => state.movie);
  const selectedMovie = isSelectedMovie ? movies[movieId - 1] : null;

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const separate_movies = (mvs = []) => {
    const movies_1 = mvs.slice(0,10)
    const movies_2 = mvs.slice(10,25)
    const movies_3 = mvs.slice(25,50)
    const movies_4 = mvs.slice(50,75)
    const movies_5 = mvs.slice(75,100)
    const updated_movies = [movies_1, movies_2, movies_3, movies_4, movies_5];

    return updated_movies
  }
  const updated_movies = movies ? separate_movies(movies) : "";

  // ! FAVORITE ASYNC TASKS
  const addFavorite = (movie_id) => { dispatch(addFavoriteMovie(movie_id)) };

  const removeFavorite = (movie_id) => {dispatch(removeFavoriteMovie(movie_id)) };

  const selectMovieHandler = (movie_id, movie) => { !isSelectedMovie ? dispatch(selectMovie({ movieId: movie_id, movie: movie })) : dispatch(unselectMovie()) }


  const type = "Movies";
  const description = "Movies move us like nothing else can, whether they're scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.";

  return (
    <>
      <NavbarDetailed></NavbarDetailed>
      <DisplayContent type={type} description={description}>
        {status === "completed" && !error && updated_movies &&
            <>
              <MovieList addFavorite={addFavorite} removeFavorite={removeFavorite} selectMovie={selectMovieHandler} allMovies={movies} movies={updated_movies[0]} rank="Most Popular Movies - Rank: 1-10"></MovieList>
              <MovieList addFavorite={addFavorite} removeFavorite={removeFavorite} selectMovie={selectMovieHandler} allMovies={movies} movies={updated_movies[1]} rank="Most Popular Movies - Rank: 11-25"></MovieList>
              <MovieList addFavorite={addFavorite} removeFavorite={removeFavorite} selectMovie={selectMovieHandler} allMovies={movies} movies={updated_movies[2]} rank="Most Popular Movies - Rank: 26-50"></MovieList>
              <MovieList addFavorite={addFavorite} removeFavorite={removeFavorite} selectMovie={selectMovieHandler} allMovies={movies} movies={updated_movies[3]} rank="Most Popular Movies - Rank: 51-75"></MovieList>
              <MovieList addFavorite={addFavorite} removeFavorite={removeFavorite} selectMovie={selectMovieHandler} allMovies={movies} movies={updated_movies[4]} rank="Most Popular Movies - Rank: 76-100"></MovieList>
            </>
          }

        {error && <p>An error occured</p>}

        {isSelectedMovie &&
          <>
            {ReactDom.createPortal(<Backdrop />, document.getElementById("backdrop"))}
            {ReactDom.createPortal(<SelectedMovieInformation movie={selectedMovie} />, document.getElementById("movie-description"))}
          </>
        }

        <Footer />
      </DisplayContent>
    </>
  );
};

export default Movies;
