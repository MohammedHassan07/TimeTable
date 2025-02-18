import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import getRequest from "../../services/getRequest";

const CoursePieChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest('/api/chart/workload');
            console.log('work load chart', response);
            const labels = Object.keys(response.data);
            const values = Object.values(response.data);

            setChartData({
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
                }]
            });
        };

        fetchData();
    }, []);

    return <Pie data={chartData} />;
};

export default CoursePieChart;