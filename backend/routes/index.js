const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const db = require("../db");

router.get("/groups", async (req, res) => {
  try {
    const sql = fs.readFileSync(path.resolve(process.env.BASEDIR, "sql/groups.sql")).toString();
    const data = await db(sql);

    const result = transformData(data);

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

function transformData(data) {
  const result = [];
  const groupsMap = {};

  data.forEach(row => {
    if (!groupsMap[row.id]) {
      groupsMap[row.id] = {
        id: row.id,
        group_caption: row.group_caption,
        nodes: []
      };
      result.push(groupsMap[row.id]);
    }
    const group = groupsMap[row.id];

    let node = group.nodes.find(n => n.id === row.node_id);
    if (!node) {
      node = {
        id: row.node_id,
        node_caption: row.node_caption,
        status: {
          color: row.node_status_color,
          description: row.node_status_description
        },
        interfaces: [],
        applications: [],
        admin: {
          fullName: `${row.firstname} ${row.lastname}`,
          email: row.email
        }
      };
      group.nodes.push(node);
    }

    if (row.interface_caption && !node.interfaces.some(i => i.interface_caption === row.interface_caption)) {
      node.interfaces.push({
        interface_caption: row.interface_caption,
        status: {
          color: row.interface_status_color,
          description: row.interface_status_description
        }
      });
    }

    if (row.application_caption && !node.applications.some(a => a.application_caption === row.application_caption)) {
      node.applications.push({
        application_caption: row.application_caption
      });
    }
  });

  return result;
}

router.get("/metrics", async (req, res) => {
  try {
    const sql = fs.readFileSync(path.resolve(process.env.BASEDIR, "sql/metrics.sql")).toString();
    const data = await db(sql);

    const result = transformMetrics(data);

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

function transformMetrics(data) {
  const result = [];
  const nodesMap = {};

  const sortedData = [...data].sort((a, b) => 
    new Date(a.datetime) - new Date(b.datetime)
  );

  sortedData.forEach(row => {
    if (!nodesMap[row.node_id]) {
      nodesMap[row.node_id] = {
        node_id: row.node_id,
        metrics: []
      };
      result.push(nodesMap[row.node_id]);
    }
    
    nodesMap[row.node_id].metrics.push({
      datetime: row.datetime,
      cpu_utilization: row.cpu_utilization,
      memory_utilization: row.memory_utilization,
      disk_utilization: row.disk_utilization
    });
  });

  return result;
}

module.exports = router;
