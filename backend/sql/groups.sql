SELECT 
  nodes.id AS node_id,
  groups.id,
  groups.caption AS group_caption,
  nodes.caption AS node_caption,
  node_statuses.color AS node_status_color,
  node_statuses.description AS node_status_description,
  interfaces.id AS interfaces_id,
  interfaces.caption AS interface_caption,
  interface_statuses.color AS interface_status_color,
  interface_statuses.description AS interface_status_description,
  users.firstname,
  users.lastname,
  users.email,
  applications.caption AS application_caption
FROM groups_nodes
JOIN groups ON groups_nodes.group_id = groups.id
JOIN nodes ON groups_nodes.node_id = nodes.id
JOIN statuses AS node_statuses ON nodes.status = node_statuses.id
LEFT JOIN interfaces ON nodes.interface = interfaces.id
LEFT JOIN statuses AS interface_statuses ON interfaces.status = interface_statuses.id
JOIN users ON nodes.admin = users.id
JOIN nodes_applications ON nodes_applications.node_id = nodes.id
JOIN applications ON nodes_applications.application_id = applications.id

