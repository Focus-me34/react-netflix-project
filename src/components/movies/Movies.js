import NavbarDetailed from "../navbar/NavbarDetailed";
import DisplayContent from "../UI/DisplayContent";
import MovieList from "./MovieList";
import Footer from "../footer/Footer";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetch from "./../../hooks/useFetch"

import { getMovies } from "../../lib/api";
import classes from "./Movies.module.css";

const Movies = () => {
  const { sendRequest, status, data: movies, error} = useFetch(getMovies, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const separate_movies = (mvs = []) => {
    // console.log(mvs);
    const movies_1 = mvs.slice(0,10)
    const movies_2 = mvs.slice(10,25)
    const movies_3 = mvs.slice(25,50)
    const movies_4 = mvs.slice(50,75)
    const movies_5 = mvs.slice(75,100)
    const updated_movies = [movies_1, movies_2, movies_3, movies_4, movies_5];

    return updated_movies
  }
  const updated_movies = movies ? separate_movies(movies) : "";

  const type = "Movies";
  const description =
    "Movies move us like nothing else can, whether they're scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.";


  return (
    <>
      <NavbarDetailed></NavbarDetailed>
      <DisplayContent type={type} description={description}>
        {status === "completed" && !error && updated_movies &&
            <>
              <MovieList allMovies={movies} movies={updated_movies[0]} rank="1-10"></MovieList>
              <MovieList allMovies={movies} movies={updated_movies[1]} rank="11-25"></MovieList>
              <MovieList allMovies={movies} movies={updated_movies[2]} rank="26-50"></MovieList>
              <MovieList allMovies={movies} movies={updated_movies[3]} rank="51-75"></MovieList>
              <MovieList allMovies={movies} movies={updated_movies[4]} rank="76-100"></MovieList>
            </>
          }

        {error && <p>An error occured</p>}
        <Footer />
      </DisplayContent>
    </>
  );
};

export default Movies;
