import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

// eslint-disable-next-line react/prop-types
const RevenueChart = ({ className }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = [20000, 40000, 45000, 64000, 38000, 50000, 70000, 45000, 60000, 75000, 40000, 50000];
    const maxValue = Math.max(...data);
    const maxIndex = data.indexOf(maxValue);

    const options = {
      chart: {
        type: 'area',
        height: 400,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: 'Revenue',
          data: data.map((value, index) =>
            index === maxIndex
              ? { x: index, y: value, marker: { size: 8, fillColor: '#2563eb', strokeColor: '#2563eb' } }
              : { x: index, y: value }
          ),
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
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          gradientToColors: ['#93c5fd'],
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      stroke: {
        width: 2,
        curve: 'straight',
        colors: ['#2563eb'],
      },
      markers: {
        size: [5], 
        colors: ['#2563eb'],
        strokeColors: '#2563eb',
        strokeWidth: 2,
        shape: 'circle',
      },
      dataLabels: {
        enabled: true, 
        formatter: (value, { dataPointIndex }) => {

          return dataPointIndex === maxIndex ? `${value.toLocaleString()} €` : ''; // Show only max value
        },
        offsetY: -8,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: ['#2563eb'], 
        },
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
    <div className={`flex relative flex-col ${className}`}>
      <h1 className="font-semibold p-2 text-xl">Revenue</h1>
      <div id="chart" ref={chartRef} className="chart-container" />
    </div>
  );
};

export default RevenueChart;
