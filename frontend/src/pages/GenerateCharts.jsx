import React, { useState } from "react";
import FacultyWorkloadChart from "./charts/FacultyWorkloadChart";
import CoursePieChart from "./charts/CoursePieChart";
import DepartmentTimetableChart from "./charts/DepartmentTimetableChart";
import FacultyQualificationChart from "./charts/FacultyQualificationChart";
import uploadFile from '../services/uploadFile';

const GenerateCharts = () => {
    const [file, setFile] = useState(null);
    const [chartsVisible, setChartsVisible] = useState(false);

    async function handleGenerate() {
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await uploadFile('/api/chart/draw-graphs', formData);

            if (response.flag) {

                setChartsVisible(true); 

                alert("File uploaded successfully.");

            } else {

                alert("File upload failed.");
            }
        } catch (error) {

            console.error("Error uploading file:", error);
            alert("An error occurred while uploading the file.");
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded shadow">
                <div>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="border border-gray-300 rounded p-2"
                    />
                </div>
                <div>
                    <button
                        onClick={handleGenerate}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:cursor-pointer hover:bg-blue-600"
                    >
                        Generate
                    </button>
                </div>
            </div>

            {chartsVisible ? ( // Render charts only if chartsVisible is true
                <div className="flex flex-col mt-6 ">
                    <div className="bg-white shadow-md w-full border-gray-500 text-center p-2">
                        <FacultyWorkloadChart />
                    </div>
                    <div className="bg-white p-4 shadow-md border-t-2 border-gray-500 w-96">
                        <CoursePieChart />
                    </div>
                </div>
            ) : (

                <h2>Upload file to get insights</h2>
            )}
        </div>
    );
};

export default GenerateCharts;