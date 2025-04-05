import classNames from "classnames";
import styles from "./DescriptionNodeCard.module.css";
import Status from "../Status/Status";
import MetricChart from "../MetricChart/MetricChart";
import { useSelector } from "react-redux";

function DescriptionNodeCard({
  nodeCaption,
  metric,
  interfaces,
  status,
  name,
  email,
  app,
}) {
  const metricId = useSelector((s) => s.groups.selectedNodeId);

  return (
    <div className={classNames(styles.description_node_card, {[styles.description_node_card_metric] : metricId})}>
      {metricId && <MetricChart metric={metric} nodeCaption={nodeCaption} />}
      {interfaces && (
        <div className={classNames(styles.description_node_card__item)}>
          <div className={classNames(styles.card__item_title)}>
            Интерфейс: {interfaces}
          </div>
          <Status status={status} />
        </div>
      )}
      <div className={classNames(styles.description_node_card__item)}>
        <div className={classNames(styles.card__item_title)}>
          Администратор:
        </div>
        <div className={classNames(styles.card__item_text)}>{name}</div>
        <div className={classNames(styles.card__item_text)}>{email}</div>
      </div>
      <div className={classNames(styles.description_node_card__item)}>
        <div className={classNames(styles.card__item_title)}>Приложения:</div>
        <div className={classNames(styles.card__item_text)}>- {app}</div>
      </div>
    </div>
  );
}

export default DescriptionNodeCard;
