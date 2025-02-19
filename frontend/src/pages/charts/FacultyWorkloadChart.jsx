import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import getRequest from "../../services/getRequest";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FacultyWorkloadChart = () => {

    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [response, setResponse] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRequest('/api/chart/workload');

                if (!response) {
                    console.error("Error: API response is empty or undefined");
                    return;
                }

                setResponse(response);

                const labels = Object.keys(response).slice(7);
                const values = Object.values(response).slice(7);
                const quarterLength = Math.ceil(values.length / 4);

                const datasets = [];
                for (let i = 0; i < 4; i++) {
                    datasets.push({
                        label: `Faculty Workload (${i * quarterLength}-${(i + 1) * quarterLength})`,
                        data: values.slice(i * quarterLength, (i + 1) * quarterLength),
                        backgroundColor: `rgba(${75 + i * 20}, 192, 192, 0.6)`,
                        borderColor: `rgba(${75 + i * 20}, 192, 192, 1)`,
                        borderWidth: 1,
                        color: '#666000'
                    });
                }

                setChartData({
                    labels: labels.slice(0, quarterLength), // Adjust labels for the first graph
                    datasets: datasets
                });

            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h2 className="text-xl font-bold text-left">Faculty Workload</h2>
            <div className="flex flex-wrap justify-center items-center border-2 border-gray-500">

                {chartData.datasets.map((dataset, index) => (
                    <div key={index} className="w-full sm:w-1/2 mt-2">
                        <Bar className="w-full" data={{ labels: chartData.labels, datasets: [dataset] }} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default FacultyWorkloadChart;