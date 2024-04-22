import React from 'react';
import { Bar } from 'react-chartjs-2';

function SalesChart() {
    // Mock data for the sales chart
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };

    // Configuration options for the sales chart
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
}

export default SalesChart;