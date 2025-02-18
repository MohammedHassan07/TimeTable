import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import getRequest from "../../services/getRequest";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FacultyWorkloadChart = () => {

    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [chartData2, setChartData2] = useState({ labels: [], datasets: [] });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRequest('/api/chart/workload');

                // console.log('API Response:', response); // Debugging

                if (!response) {
                    console.error("Error: API response is empty or undefined");
                    return;
                }


                const halfLength = Object.keys(response).length / 2;

                const labels1 = Object.keys(response).slice(7, halfLength);
                const values1 = Object.values(response).slice(7, halfLength);


                // console.log(labels1, labels2);

                setChartData({
                    labels: labels1,
                    datasets: [{
                        label: "Faculty Workload (0-96)",
                        data: values1,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1
                    }]
                });

                const labels2 = Object.keys(response).slice(halfLength);
                const values2 = Object.values(response).slice(halfLength);
                setChartData2(prevData => ({
                    ...prevData,
                    labels: labels2,
                    datasets: [{
                        label: "Faculty Workload (97 to last)",
                        data: values2,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1
                    }]
                }));
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };

        fetchData();
    }, []);

   
    

    return (

        <>

            <Bar className="w-full" data={chartData} />;
            <Bar className="w-full" data={chartData2} />;
        </>)
};

export default FacultyWorkloadChart;
