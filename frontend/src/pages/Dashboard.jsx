import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import postRequest from '../services/postRequest'
import { toast } from "react-toastify";
import GenerateCharts from './GenerateCharts';
import Teachers from './Teachers';
import Aside from '../components/Aside';

const Dashboard = () => {

  const navigate = useNavigate()
  const [branch, setBranch] = useState("Computer");
  const [year, setYear] = useState("First Year");
  const [subjects, setSubjects] = useState([{ subject: "", teacherId: "" }]);
  const [token, setToken] = useState('')

  useEffect(() => {

    const token = localStorage.getItem('token')
    if (token) {

      setToken(localStorage.getItem('token'))

      // console.log('Token found:', token)
    } else {

      navigate('/login')
    }
  }, [])


  const handleAddSubject = () => {
    setSubjects([...subjects, { subject: "", teacherId: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await postRequest('/api/timetable/generate', { branch, year, subjects })
      toast.success("Timetable generated successfully!");
    } catch (error) {
      toast.error("Error generating timetable!");
    }
  };

  return (

    // Generate timetable
    // <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
    //   <h2 className="text-2xl font-semibold text-gray-700">Generate Timetable</h2>
    //   <form onSubmit={handleSubmit} className="mt-4">
    //     <div className="mb-3">
    //       <label className="block text-gray-700">Branch</label>
    //       <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full p-2 border rounded">
    //         <option>Computer</option>
    //         <option>Mechanical</option>
    //         <option>Electrical</option>
    //         <option>Civil</option>
    //       </select>
    //     </div>

    //     <div className="mb-3">
    //       <label className="block text-gray-700">Year</label>
    //       <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-2 border rounded">
    //         <option>First Year</option>
    //         <option>Second Year</option>
    //         <option>Third Year</option>
    //         <option>Final Year</option>
    //       </select>
    //     </div>

    //     {subjects.map((subject, index) => (
    //       <div key={index} className="flex space-x-2 mb-3">
    //         <input
    //           type="text"
    //           placeholder="Subject"
    //           value={subject.subject}
    //           onChange={(e) => handleChange(index, "subject", e.target.value)}
    //           className="w-1/2 p-2 border rounded"
    //         />
    //         <input
    //           type="text"
    //           placeholder="Teacher ID"
    //           value={subject.teacherId}
    //           onChange={(e) => handleChange(index, "teacherId", e.target.value)}
    //           className="w-1/2 p-2 border rounded"
    //         />
    //       </div>
    //     ))}

    //     <button type="button" onClick={handleAddSubject} className="text-blue-500">+ Add Subject</button>
    //     <button type="submit" className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">Generate</button>
    //   </form>
    // </div>
    <>


      {/* main */}
      <div className="flex items-center justify-center">

        {/* <Aside /> */}

        {/* content */}
        <div className="w-[85vw] bg-gray-100 min-h-screen">
          <Outlet />
        </div>
        
      </div>
      {/* <Teachers /> */}

    </>
  )
}

export default Dashboard
