import classNames from "classnames";
import styles from "./DescriptionColumn.module.css";
import DescriptionNodeCard from "../../DescriptionNodeCard/DescriptionNodeCard";
import { useSelector } from "react-redux";
import { STATUS_PRIORITY } from "../../utils/StatusConfig";

function DescriptionColumn() {
  const groups = useSelector((s) => s.groups.filteredData);
  const metricId = useSelector((s) => s.groups.selectedNodeId);
  const metrics = useSelector((s) => s.groups.metrics);
  const node = groups.flatMap((g) => g.nodes).find((n) => n.id === metricId);

  const getMetricById = (id) => {
    return metrics.find((m) => m.node_id === id);
  };

  const getWorstStatus = (interfaces) => {
    if (!interfaces || interfaces.length === 0) return null;

    return interfaces.reduce((worst, int) => {
      return STATUS_PRIORITY[int.status.description] > STATUS_PRIORITY[worst]
        ? int.status.description
        : worst;
    }, interfaces[0].status.description);
  };

  return (
    <div className={classNames(styles.description_nodes_column)}>
      {node && (
        <DescriptionNodeCard
          key={node.id}
          nodeCaption={node.node_caption}
          metric={getMetricById(node.id)}
          interfaces={node.interfaces
            .map((int) => int.interface_caption)
            .join(", ")}
          status={getWorstStatus(node.interfaces) || node.status.description}
          name={node.admin.fullName}
          email={node.admin.email}
          app={node.applications
            .map((app) => app.application_caption)
            .join(", ")}
        />
      )}
      {!node &&
        groups.map((group) =>
          group.nodes.map((node) => {
            const status =
              getWorstStatus(node.interfaces) || node.status.description;
            return (
              <DescriptionNodeCard
                key={node.id}
                interfaces={node.interfaces
                  .map((int) => int.interface_caption)
                  .join(", ")}
                status={status}
                name={node.admin.fullName}
                email={node.admin.email}
                app={node.applications
                  .map((app) => app.application_caption)
                  .join(", ")}
              />
            );
          })
        )}
    </div>
  );
}

export default DescriptionColumn;
