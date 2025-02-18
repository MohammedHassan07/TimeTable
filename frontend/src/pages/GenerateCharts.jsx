import React from "react";
import FacultyWorkloadChart from "./charts/FacultyWorkloadChart";
import CoursePieChart from "./charts/CoursePieChart";
import DepartmentTimetableChart from "./charts/DepartmentTimetableChart";
import FacultyQualificationChart from "./charts/FacultyQualificationChart";

const GenerateCharts = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center">Reports Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-4 shadow-md"><FacultyWorkloadChart /></div>
                {/* <div className="bg-white p-4 shadow-md"><CoursePieChart /></div> */}
                {/* <div className="bg-white p-4 shadow-md"><DepartmentTimetableChart /></div> */}
                {/* <div className="bg-white p-4 shadow-md"><FacultyQualificationChart /></div> */}
            </div>
        </div>
    );
};

export default GenerateCharts;
