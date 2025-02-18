import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import getRequest from "../../services/getRequest";

const FacultyQualificationChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest('/api/chart/qualification');
            console.log('qualification chart', response);

            const labels = Object.keys(response.data);
            const values = Object.values(response.data);

            setChartData({
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
                }]
            });
        };

        fetchData();
    }, []);

    return <Doughnut data={chartData} />;
};

export default FacultyQualificationChart;