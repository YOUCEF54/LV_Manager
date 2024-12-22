import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const RevenueChart = ({ className }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: {
        type: 'line',
        toolbar: {
          show: false, // Hide the toolbar
        },
      },
      series: [
        {
          name: 'Revenue',
          data: [20000, 40000, 45000, 64000, 38000, 50000, 70000, 45000, 60000, 75000, 40000, 50000],
        },
      ],
      xaxis: {
        categories: [
          "Janvier", "Février", "Mars", "Avril", "Mai",
          "Juin", "Juillet", "Août", "Septembre", "Octobre",
          "Novembre", "Décembre",
        ],
        labels: {
          style: {
            colors: '#888', // Customize x-axis label color
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => `${value / 1000}k`, // Show 'k' format for y-axis
          style: {
            colors: '#888', // Customize y-axis label color
          },
        },
      },
      colors: ['#2563eb'], // Tailwind blue-600
      dataLabels: {
        enabled: false, // Disable data labels on points
      },
      stroke: {
        curve: 'smooth', // Add curve to the line
      },
      grid: {
        borderColor: '#f1f5f9', // Light gray grid lines
        strokeDashArray: 4,
      },
      tooltip: {
        y: {
          formatter: (value) => `${value.toLocaleString()} €`, // Format tooltip with currency
        },
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className={`flex relative flex-col  ${className}`}>
      <h1 className="font-semibold p-2 text-xl">Revenue</h1>
      <div style={{ height: '40vh' }} id="chart" ref={chartRef} />
    </div>
  );
};

export default RevenueChart;
