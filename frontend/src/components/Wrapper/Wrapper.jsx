import classNames from "classnames";
import styles from "./Wrapper.module.css";

function Wrapper({ children }) {
  return <div className={classNames(styles.wrapper)}>{children}</div>;
}

export default Wrapper;
