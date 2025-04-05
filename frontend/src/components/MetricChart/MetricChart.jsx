import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function MetricChart({ metric, nodeCaption }) {
  const status = useSelector((s) => s.groups.statusMetrics);

  if (status === "failed") {
    return <div>Не удалось отобразить метрики</div>;
  }

  const labels = metric.metrics.map((m) =>
    new Date(m.datetime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const cpuData = metric.metrics.map((m) => m.cpu_utilization);
  const memoryData = metric.metrics.map((m) => m.memory_utilization);
  const diskData = metric.metrics.map((m) => m.disk_utilization);

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        data: cpuData,
        label: "Утилизвция cpu",
        borderColor: "#FF5555",
        lineTension: 0.5,
      },
      {
        data: memoryData,
        label: "Утилизвция memory",
        borderColor: "#FFE359",
        lineTension: 0.5,
      },
      {
        data: diskData,
        label: "Утилизация disk",
        borderColor: "#21D96B",
        lineTension: 0.5,
      },
    ],
  };

  return (
    <>
      {!metric || metric.length === 0 ? (
        <div>Нет данных для отображения</div>
      ) : (
        <div>
          <Line
            type="line"
            width={360}
            height={260}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: `Метрика ${nodeCaption}`,
                  font: {
                    size: 16,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            }}
            data={lineChartData}
          />
        </div>
      )}
    </>
  );
}

export default MetricChart;
