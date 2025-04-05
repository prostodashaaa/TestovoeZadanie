import classNames from "classnames";
import styles from "./NodeCard.module.css";
import Status from "../Status/Status";
import MetricNode from "../MetricNode/MetricNode";

function NodeCard({ title, status, metrics = { cpu, memory, disk }, onClick }) {
  return (
    <div className={classNames(styles.node_card)} onClick={onClick}>
      <h2 className={classNames(styles.node_card__title)}>{title}</h2>
      <Status status={status} />
      <div className={classNames(styles.node_card__metrics)}>
        <MetricNode text={"cpu"} metric={metrics.cpu} />
        <MetricNode text={"memory"} metric={metrics.memory} />
        <MetricNode text={"disk"} metric={metrics.disk} />
      </div>
    </div>
  );
}

export default NodeCard;
