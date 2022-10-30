import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  animation: false,
  aspectRatio: 3,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "The Title",
    },
  },
  scales: {
    y: {
      max: 10,
    },
  },
};

function DashboardSubmissionStatisticsChart(props) {
  const { submissionData } = props;

  const labels = Array(7)
    .fill(9)
    .map((_, i) => {
      let date = new moment();
      date.add(-i, "days");
      return date.format("YYYY-MM-DD");
    });
  labels.reverse();

  const maxValue = submissionData.reduce(
    (prev, current) =>
      (current.submissionCountTotal > prev.submissionCountTotal &&
        current.submissionCountTotal) ||
      prev.submissionCountTotal
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Total submissions",
        data: labels.map((date) => {
          return (
            submissionData.find((el) => el.date === date)
              ?.submissionCountTotal || 0
          );
        }),
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default DashboardSubmissionStatisticsChart;
