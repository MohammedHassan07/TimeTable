import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import getRequest from "../../services/getRequest";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const CoursePieChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest('/api/chart/courses');
            
            // console.log('work load chart', response);

            const labels = Object.keys(response);
            const values = Object.values(response);

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

    return(
        <>

    <h2 className="text-xl font-bold">Courses</h2>
        <Pie className="" data={chartData} />;
        </>
    ) 
};

export default CoursePieChart;