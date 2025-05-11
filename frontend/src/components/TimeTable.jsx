import { useState } from 'react';
import { Plus, View } from "lucide-react";
import { ToastContainer } from 'react-toastify';
import postRequest from "../services/postRequest";

const initialTimetable = [{
    timeSlots: [
        '07:45-08:35',
        '08:35-09:25',
        '09:25-10:15',
        '10:15-10:30', // Short Break
        '10:30-11:20',
        '11:20-12:10',
        '12:10-01:00',
    ],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    schedule: {
        'Monday': {
            '07:45-08:35': { subject: 'SEN' },
            '08:35-09:25': { subject: 'EM-III' },
            '09:25-10:15': { subject: 'DSA' },
            '10:15-10:30': { subject: 'Break', room: null },
            '10:30-11:20': { subject: 'PPL' },
            '11:20-12:10': { subject: 'DSA-PR B1 / MP-PR B2', room: '141 / 212' },
            '12:10-01:00': null,
        },
        'Tuesday': {
            '07:45-08:35': { subject: 'SEN' },
            '08:35-09:25': { subject: 'DSA' },
            '09:25-10:15': { subject: 'PBL' },
            '10:15-10:30': { subject: 'Break', room: null },
            '10:30-11:20': { subject: 'MP' },
            '11:20-12:10': { subject: 'Library B1 / DSA-PR B2', room: 'Library / 141' },
            '12:10-01:00': null,
        },
        'Wednesday': {
            '07:45-08:35': { subject: 'SEN' },
            '08:35-09:25': { subject: 'EM-III' },
            '09:25-10:15': { subject: 'PPL' },
            '10:15-10:30': { subject: 'Break', room: null },
            '10:30-11:20': { subject: 'COC/AC' },
            '11:20-12:10': { subject: 'MP-PR B1 / DSA-PR B2', room: '212 / 141' },
            '12:10-01:00': { subject: 'DSA-PR B2', room: '141' },
        },
        'Thursday': {
            '07:45-08:35': { subject: 'DSA' },
            '08:35-09:25': { subject: 'SEN' },
            '09:25-10:15': { subject: 'Library', room: 'Library' },
            '10:15-10:30': { subject: 'Break', room: null },
            '10:30-11:20': { subject: 'MP' },
            '11:20-12:10': { subject: 'DSA-PR B1 / Library B2', room: '141 / Library' },
            '12:10-01:00': null,
        },
        'Friday': {
            '07:45-08:35': { subject: 'MP' },
            '08:35-09:25': { subject: 'PBL' },
            '09:25-10:15': { subject: 'DSA' },
            '10:15-10:30': { subject: 'Break', room: null },
            '10:30-11:20': { subject: 'EM-III' },
            '11:20-12:10': { subject: 'PPL' },
            '12:10-01:00': null,
        },
        'Saturday': {
            '07:45-08:35': { subject: 'EM-III' },
            '08:35-09:25': { subject: 'MP' },
            '09:25-10:15': { subject: 'Library', room: 'Library' },
            '10:15-10:30': { subject: 'Break', room: null },
            '10:30-11:20': { subject: 'PPL' },
            '11:20-12:10': null,
            '12:10-01:00': { subject: 'PBL' },
        },
    },
}];

const Timetable = () => {

    // const [timetable] = useState(initialTimetable);
    const [view, setView] = useState("list");
    const [departmentFilter, setDepartmentFilter] = useState('')
    const [timetable, setTimetable] = useState(initialTimetable);
    const [formData, setFormData] = useState({ department: "", year: "" });

    const handleDepartmentFilterChange = async (e) => {

        const filter = e.target.value
        setDepartmentFilter(filter)

        const response = await getRequest(`/api/timetable/generate`)

        // setTeachers(response.teachers)
        console.log(response)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert freeSlots object into an array of { day, slotNumber }

        const newTeacher = {
            department: formData.department,
            year: formData.year
        };

        // setTeachers([...teachers, newTeacher]);
        setFormData({ department: "", year: "" });

        // console.log("Sending Data:", newTeacher);
        const response = await postRequest("/api/teacher/add-teacher", newTeacher);
        // console.log(response);
        notify(response.status, response.message)
    };



    return (

        <>
            {/* Header */}
            <div className="p-2 flex flex-col justify-center items-start w-full overflow-y-scroll">
                <ToastContainer />
                <div className="flex justify-between items-center mb-8 border-b-2 border-gray-800 w-full">
                    <h1 className="text-2xl font-semibold text-gray-900">Teachers</h1>
                    <div className="flex gap-4 p-2">
                        <button onClick={() => setView("list")} className={`hover:cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${view === "list" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                            <View className="w-4 h-4" /> View
                        </button>
                        <button onClick={() => setView("create")} className={`hover:cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${view === "create" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                            <Plus className="w-4 h-4" /> Create
                        </button>
                    </div>
                </div>
            </div>


            {view === "create" ? (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm w-full">
                    <h2 className="text-xl font-semibold mb-6">Create Timetable</h2>
                    <div className="space-y-4 flex w-full gap-2">

                        <div className='w-full'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <select value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" required>
                                <option value="">Select a department</option>
                                <option value="Civil">Civil</option>
                                <option value="Computer">Computer</option>
                                <option value="Electrical">Electrical</option>
                                <option value="ENTC">ENTC</option>
                                <option value="Mechanical">Mechanical</option>
                            </select>
                        </div>

                        <div className='w-full'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>

                            <select  value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} 
                            className="w-full p-2 border border-gray-300 rounded-lg" required>
                                <option value="">Select a Year</option>
                                <option value="SE">SE</option>
                                <option value="TE">TE</option>
                                <option value="BE">BE</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 hover:cursor-pointer">Submit</button>
                    </div>
                </form>
            ) : (
                <>
                    {/* search */}
                    <div className="w-full">
                        <select value={departmentFilter} onChange={(e) => handleDepartmentFilterChange(e)} className="w-full p-2 border border-gray-300 rounded-lg" required>
                            <option value="All">Select a department</option>
                            <option value="Civil">Civil</option>
                            <option value="Computer">Computer</option>
                            <option value="Electrical">Electrical</option>
                            <option value="ENTC">ENTC</option>
                            <option value="Mechanical">Mechanical</option>
                        </select>
                    </div>


                    <div className="w-full max-w-6xl mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-x-auto">

                        <div className="flex flex-col">

                            {timetable.map((table) => {
                                return (
                                    <>
                                        {/* Header Row */}
                                        < div className="flex border-b border-gray-300" >
                                            <div className="w-28 p-2 font-semibold text-center bg-blue-100 border-r border-gray-300">Time</div>
                                            {
                                                table.days.map((day) => (
                                                    <div key={day} className="flex-1 p-2 font-semibold text-center bg-blue-100 border-r border-gray-300">
                                                        {day}
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        {/* Time Slots and Schedule */}
                                        {table.timeSlots.map((time) => (
                                            <div key={time} className="flex border-b border-gray-200">
                                                <div className="w-28 p-2 text-center bg-gray-50 font-medium border-r border-gray-300">{time}</div>
                                                {table.days.map((day) => {
                                                    const slot = table.schedule[day]?.[time] || null;
                                                    return (
                                                        <div
                                                            key={`${day}-${time}`}
                                                            className="flex-1 p-2 border-r border-gray-200 hover:bg-blue-50 transition-colors"
                                                        >
                                                            {slot ? (
                                                                slot.subject === 'Break' ? (
                                                                    <p className="text-center text-yellow-600 font-semibold">Break</p>
                                                                ) : (
                                                                    <div className="text-center">
                                                                        <p className="font-medium text-gray-900">{slot.subject}</p>
                                                                    </div>
                                                                )
                                                            ) : (
                                                                <p className="text-center text-gray-400">Free</p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </>
                                )
                            })}
                        </div>
                    </div >

                    {/* No timetable is added */}
                    <div className="bg-white rounded-lg shadow-sm w-full mt-2">
                        {timetable.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No Timetable added yet. Click Create to add one.</div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {
                                    // teachers.map((teacher, index) => (
                                    //     <div key={index} className="p-4 flex items-center justify-between">
                                    //         <div>
                                    //             <h3 className="font-medium text-gray-900">{teacher.name}</h3>
                                    //             <p className="text-sm text-gray-500">{teacher.email}</p>
                                    //             <p className="text-sm text-gray-500">{teacher.department}</p>
                                    //             <p className="text-sm text-gray-500">Schedule: {teacher.freeSlots.map(({ day, slotNumber }) => `${day} (Slot ${slotNumber})`).join(", ")}</p>
                                    //             {/* <p className="text-sm text-gray-500">Subjects: {teacher.practical.map(({ day, slotNumber }) => `${day} (Slot ${slotNumber})`).join(", ")}</p> */}
                                    //         </div>
                                    //     </div>
                                    // ))
                                }
                            </div>
                        )}
                    </div>
                </>
            )
            }

        </>
    );
};

export default Timetable;
