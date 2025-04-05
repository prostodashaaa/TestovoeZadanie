import classNames from "classnames";
import styles from "./Status.module.css";
import { STATUS_CONFIG } from "../utils/StatusConfig";

function Status({ status }) {
  const isValidStatus = Object.keys(STATUS_CONFIG).includes(status);

  const safeStatus = isValidStatus ? status : "UNREACHABLE";
  const config = STATUS_CONFIG[safeStatus];

  return (
    <div className={classNames(styles.status)}>
      <div
        className={classNames(styles.status__color, styles[config.className])}
      ></div>
      <div className={classNames(styles.status__text)}>{config.text}</div>
    </div>
  );
}

export default Status;
