import NavbarDetailed from "../navbar/NavbarDetailed";
import DisplayContent from "../UI/DisplayContent";
import classes from "./Series.module.css"

const Series = () => {

  const type = "Series"
  const description = "Lonely summer night or cosy sunday morning under the duvet with your sweet love, enjoy watching the most popular series with us. We also have a catalogue of exclusive content, produced by our own studios such as Stranger Things, Squid Games, The Witcher and way more!"

  return (
    <>
      <NavbarDetailed></NavbarDetailed>
      <DisplayContent type={type} description={description} ></DisplayContent>
    </>
  );
}

export default Series;
