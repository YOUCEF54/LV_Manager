import { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler, // Import Filler for shading
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

// eslint-disable-next-line react/prop-types
const RevenueChart = ({className}) => {
  const chartRef = useRef(null);

  const data = {
    labels: [
      "Janvier", "Février", "Mars", "Avril", "Mai",
      "Juin", "Juillet", "Août", "Septembre", "Octobre",
      "Novembre", "Décembre",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [20000, 40000, 45000, 64000, 38000, 50000, 70000, 45000, 60000, 75000, 40000, 50000],
        borderColor: "#2563eb", // Tailwind blue-600
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // Wait for the chart to render
            return null;
          }

          // Create a gradient
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(37, 99, 235, 0.3)"); // Darker blue near the line
          gradient.addColorStop(1, "rgba(37, 99, 235, 0)");   // Fully transparent near the x-axis
          return gradient;
        },
        pointBackgroundColor: "#2563eb",
        pointBorderColor: "#ffffff",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#2563eb",
        fill: true, // Enables shading under the line
        tension: 0, // Straight lines (no curve)
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw.toLocaleString()} €`; // Format tooltip with currency
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            return `${value / 1000}k`; // Show 'k' format for y-axis
          },
        },
        grid: {
          borderDash: [5, 5], // Dashed lines for grid
        },
      },
    },
  };

  return (
    <div className={className}>
      <h2 className="text-lg font-medium mb-4">Revenue</h2>
      <Line className="max-h-[50vh]" ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
