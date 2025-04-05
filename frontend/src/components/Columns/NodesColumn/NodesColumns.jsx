import classNames from "classnames";
import styles from "./NodesColumn.module.css";
import NodeCard from "../../NodeCard/NodeCard";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { getMetrics, groupActions } from "../../../store/group.slice";

function NodesColumn() {
  const dispatch = useDispatch();
  const groups = useSelector((s) => s.groups.filteredData);
  const metrics = useSelector((s) => s.groups.metrics);

  const fetchMetrics = useCallback(() => {
    dispatch(getMetrics());
  }, [dispatch]);

  useEffect(() => {
    fetchMetrics();

    const intervalId = setInterval(fetchMetrics, 60000);

    return () => clearInterval(intervalId);
  }, [fetchMetrics]);

  const getLastMetrics = (id) => {
    const nodeMetrics = metrics.find((m) => m.node_id === id)?.metrics.at(-1);
    if (!nodeMetrics || nodeMetrics.length === 0) return null;

    return nodeMetrics;
  };

  return (
    <div className={classNames(styles.nodes_column)}>
      {groups.map((item) =>
        item.nodes.map((node) => {
          const lastMetrics = getLastMetrics(node.id);
          return (
            <NodeCard
              key={JSON.stringify(node.node_caption)}
              title={node.node_caption}
              status={node.status.description}
              onClick={() =>
                dispatch(
                  groupActions.activeNodeId({
                    id: node.id,
                    caption: node.node_caption,
                  })
                )
              }
              metrics={
                lastMetrics
                  ? {
                      cpu: lastMetrics.cpu_utilization,
                      memory: lastMetrics.memory_utilization,
                      disk: lastMetrics.disk_utilization,
                    }
                  : { cpu: 0, memory: 0, disk: 0 }
              }
            />
          );
        })
      )}
    </div>
  );
}

export default NodesColumn;
