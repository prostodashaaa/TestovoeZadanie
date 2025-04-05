import classNames from "classnames";
import styles from "./MetricNode.module.css";
import { useSelector } from "react-redux";

function MetricNode({ text, metric }) {
  const status = useSelector((s) => s.groups.statusMetrics);

  return (
    <>
      {status == "failed" && (
        <div>Не удалось отобразить метрики</div>
      )}
      {status == "succeeded" && (
        <div
          className={classNames(
            styles.metrics_item,
            {
              [styles.metrics_item_yellow]: metric > 85,
            },
            {
              [styles.metrics_item__red]: metric > 95,
            },
            {
              [styles.metrics_item__gray]: metric == 0,
            }
          )}
        >
          <p className={classNames(styles.metrics_item__text)}>
            Утилизация {text}
          </p>
          <p className={classNames(styles.metrics_item__status)}>{metric}</p>
        </div>
      )}
    </>
  );
}

export default MetricNode;
