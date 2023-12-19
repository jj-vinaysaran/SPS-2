import React from 'react';
import Chart from 'react-apexcharts';

const NoiseLevelChart = () => {
  const mainColor = '#90EE90'; // Replace with your desired color

  const noiseLevelData = {
    options: {
      xaxis: {
        categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8'], // Replace with actual day labels
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: 'Noise Level (dB)',
        },
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [{
              from: 0,
              to: 100,
              color: mainColor, // Set the main color for the bars
            }],
          },
        },
      },
    },
    series: [{
      name: 'Noise Level',
      data: [80, 85, 82, 88, 90, 67, 12, 45], // Replace with actual noise level data for each day
    }],
  };

  return (
    <Chart
      options={noiseLevelData.options}
      series={noiseLevelData.series}
      type="bar"
      width="900"
      height="250"
    />
  );
};

export default NoiseLevelChart;
