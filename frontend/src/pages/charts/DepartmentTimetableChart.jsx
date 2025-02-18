import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import getRequest from "../../services/getRequest";

const DepartmentTimetableChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRequest('/api/chart/workload');
                console.log('work load chart', response);
                const labels = Object.keys(response.data);
                const values = Object.values(response.data);

                setChartData({
                    labels,
                    datasets: [{
                        label: "Courses per Stream",
                        data: values,
                        borderColor: "rgba(54, 162, 235, 1)",
                        fill: false
                    }]
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return <Line data={chartData} />;
}

export default DepartmentTimetableChart;