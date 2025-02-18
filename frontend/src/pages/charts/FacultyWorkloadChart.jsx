import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import getRequest from "../../services/getRequest";

const FacultyWorkloadChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRequest('/api/chart/workload');

                // console.log('API Response:', response); // Debugging

                if (!response || !response) {
                    console.error("Error: API response is empty or undefined");
                    return;
                }

                const labels = Object.keys(response);
                const values = Object.values(response);

                console.log('Labels:', labels);
                console.log('Values:', values);

                setChartData({
                    labels,
                    datasets: [{
                        label: "Faculty Workload",
                        data: values,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1
                    }]
                });
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };

        fetchData();
    }, []);

    return <Bar data={chartData} />;
};

export default FacultyWorkloadChart;
