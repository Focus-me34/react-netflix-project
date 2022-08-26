import classes from "./SpinLoader.module.css"

const SpinLoader = () => {
  return (
    <div className={classes.spinner} data-testid="spin-loader"></div>
   );
}

export default SpinLoader;
