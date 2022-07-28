import NavbarDetailed from "../navbar/NavbarDetailed";
import DisplayContent from "../UI/DisplayContent";
import MovieList from "./MovieList";
import Footer from "../footer/Footer";


// import useFetch from "./hooks/useFetch";
import { getActionMovies } from "../../lib/api";
import classes from "./Movies.module.css"

const Movies = () => {

  const type = "Movies"
  const description = "Movies move us like nothing else can, whether they’re scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience."

  return (
    <>
      <NavbarDetailed></NavbarDetailed>
      <DisplayContent type={type} description={description} >
        <MovieList httpMethod={getActionMovies} genre="Action"></MovieList>
        <MovieList httpMethod={getActionMovies} genre="Thriller"></MovieList>
        <MovieList httpMethod={getActionMovies} genre="Horror"></MovieList>
        <MovieList httpMethod={getActionMovies} genre="Romantic"></MovieList>
      <Footer />
      </DisplayContent>
    </>

  );
}

export default Movies;
