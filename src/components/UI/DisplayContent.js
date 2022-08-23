import classes from "./DisplayContent.module.css"

const DisplayContent = (props) => {
  return (
    <section className={classes["content-container"]}>
      <header>
        <h2>{props.type}</h2>
        <p>{props.description}</p>
      </header>

      {props.children}

    </section>
  );
}

export default DisplayContent;
