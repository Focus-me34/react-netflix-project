import NavbarDetailed from "../navbar/NavbarDetailed";
import DisplayContent from "../UI/DisplayContent";

import classes from "./Movies.module.css"

const Movies = () => {

  const type = "Movies"
  const description = "Movies move us like nothing else can, whether they’re scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience."

  return (
    <>
      <NavbarDetailed></NavbarDetailed>
      <DisplayContent type={type} description={description} >

      </DisplayContent>
    </>

  );
}

export default Movies;
