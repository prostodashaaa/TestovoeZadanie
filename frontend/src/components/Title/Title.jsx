import classNames from "classnames";
import styles from "./Title.module.css";

function Title() {
  return <h1 className={classNames(styles.title)}>Мониторинг системы</h1>;
}

export default Title;
