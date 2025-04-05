SELECT 
  metrics.datetime,
  metrics.cpu_utilization,
  metrics.memory_utilization,
  metrics.disk_utilization,
  metrics.node_id
FROM nodes
JOIN metrics ON nodes.id = metrics.node_id
