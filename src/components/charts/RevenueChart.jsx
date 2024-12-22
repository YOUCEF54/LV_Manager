import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const RevenueChart = ({ className }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: {
        type: 'line',
        height: 400, // Set the max height for the chart
        toolbar: {
          show: false,
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
            colors: '#888',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => `${value / 1000}k`,
          style: {
            colors: '#888',
          },
        },
      },
      colors: ['#2563eb'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        borderColor: '#f1f5f9',
        strokeDashArray: 4,
      },
      tooltip: {
        y: {
          formatter: (value) => `${value.toLocaleString()} €`,
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
    <div  className={`flex relative flex-col  ${className}`}>
      <h1 className="font-semibold p-2 text-xl">Revenue</h1>
      <div id="chart" ref={chartRef} className="chart-container" />

    </div>
  );
};

export default RevenueChart;
