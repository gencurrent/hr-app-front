import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "The Title",
    },
  },
};

const labels = Array(12).fill(0).map((_, i) => i * 2);

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset1',
      data: labels.map((i) => i * i ),
    },
    {
      label: 'Dataset1',
      data: labels.map((i) => i * .4 ),
    },
  ],
};



function DashboardSubmissionStatisticsChart() {
  return (
    <Line options={options} data={data} />
  );
};

export default DashboardSubmissionStatisticsChart;