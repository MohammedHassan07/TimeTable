import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import getRequest from "../../services/getRequest";

Chart.register(...registerables);

const WorkLoad = () => {
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch faculty workload (Stacked Bar Chart)
            const response1 = await getRequest("/api/chart/faculty-workload");
           
            const departments = Object.keys(response1);

            const facultyNames = [...new Set(Object.values(response1).flatMap(dept => Object.keys(dept)))];

            const datasets = facultyNames.map(faculty => ({
                label: faculty,
                data: departments.map(dept => response1[dept][faculty] || 0),
                backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`,
            }));

            setBarChartData({
                labels: departments,
                datasets: datasets
            });

            // Fetch workload distribution (Pie Chart)
            const response2 = await getRequest("/api/chart/faculty-workload-distribution");
            setPieChartData({
                labels: Object.keys(response2),
                datasets: [
                    {
                        data: Object.values(response2),
                        backgroundColor: Object.keys(response2).map(
                            () => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`
                        ),
                    }
                ]
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);

  return (
    <div className="p-5 bg-gray-100 min-h-screen w-screen">
      <h1 className="text-2xl font-bold text-center mb-5">Faculty Workload Analysis</h1>
      
      {/* Stacked Bar Chart */}
      <div className="bg-white p-5 rounded-lg shadow-md mb-5">
        <h2 className="text-lg font-semibold text-center mb-3">Faculty Workload Per Department</h2>
        {barChartData ? (
          <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: "top" } }, scales: { x: { stacked: true }, y: { stacked: true } } }} />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-center mb-3">Workload Distribution Among Faculty</h2>
        {pieChartData ? (
          <Pie className="w-[45vw]" data={pieChartData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default WorkLoad;
