import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

function Loader() {
  return (
    <div className={css.loader}>
      <RotatingLines
        visible={true}
        height="56"
        width="56"
        strokeColor="black"
        strokeWidth="4"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}

export default Loader;
