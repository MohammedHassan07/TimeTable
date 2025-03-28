import { useState } from 'react';
import { BookOpen, Code, Calendar, ChevronDown, Plus, FlaskConical, View } from 'lucide-react';

export default function Subjects() {

    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [subjects, setSubjects] = useState([{ name: '', code: '' }]);
    const [practical, setPractical] = useState('');

    const [view, setView] = useState("list");

    // Add new subject field
    const addSubject = () => {
        setSubjects([...subjects, { name: '', code: '' }]);
    };

    // Handle subject input changes
    const handleSubjectChange = (index, field, value) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to send
        const formData = {
            branch,
            year,
            semester,
            subjects,
            practical
        };

        // Here we'll call your utility function
        // try {
        //   // Import your function from utils
        //   const { saveTimetable } = await import('../utils/timetableUtils');

        //   // Call it with the two parameters it needs
        //   const result = await saveTimetable(formData.branch, formData.year);

        //   console.log('Success!', result);
        //   alert('Timetable saved successfully!');
        // } catch (error) {
        //   console.error('Error saving:', error);
        //   alert('Failed to save timetable');
        // }
    };

    return (
        <div className="p-2 flex flex-col justify-center items-center w-full">

            <div className='flex justify-between items-center mb-8 border-b-2 border-gray-800 w-full'>
                <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    Subjects
                </h1>
                <div className="flex gap-4 p-2">
                    <button onClick={() => setView("list")} className={`hover:cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${view === "list" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        <View className="w-4 h-4" /> View
                    </button>
                    <button onClick={() => setView("create")} className={`hover:cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${view === "create" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        <Plus className="w-4 h-4" /> Create
                    </button>
                </div>
            </div>

            {view === 'create' ? (

                <form className='bg-white p-6 rounded-lg shadow-sm w-full' onSubmit={handleSubmit}>
                    {/* Branch, Year, Semester Selection */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="text-sm font-medium mb-1 flex items-center gap-1">
                                <ChevronDown className="h-4 w-4" /> Branch
                            </label>
                            <select
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Branch</option>
                                <option value="CSE">CSE</option>
                                <option value="ECE">ECE</option>
                                <option value="ME">ME</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Year</label>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Year</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Semester</label>
                            <select
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Semester</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                    </div>

                    {/* Subjects List */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-3">Subjects</h2>
                        {subjects.map((subject, index) => (
                            <div key={index} className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Subject Name</label>
                                    <input
                                        type="text"
                                        value={subject.name}
                                        onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter subject name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                                        <Code className="h-4 w-4" /> Subject Code
                                    </label>
                                    <input
                                        type="text"
                                        value={subject.code}
                                        onChange={(e) => handleSubjectChange(index, 'code', e.target.value)}
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter subject code"
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSubject}
                            className="flex items-center gap-1 text-blue-500 text-sm"
                        >
                            <Plus className="h-4 w-4" /> Add Subject
                        </button>
                    </div>

                    {/* Practicals */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-3 flex items-center gap-1">
                            <FlaskConical className="text-green-500" /> Practicals
                        </h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">Subject Name</label>
                            <input
                                type="text"
                                value={practical}
                                onChange={(e) => setPractical(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter practical subject name"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <div className="bg-white rounded-lg shadow-sm w-full">
                    {subjects.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No teachers added yet. Click Create to add one.</div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {subjects.map((subject, index) => (
                                <div key={index} className="p-4 flex items-center justify-between">
                                    <div>
                                        {/* <h3 className="font-medium text-gray-900">{teacher.name}</h3>
                                        <p className="text-sm text-gray-500">{teacher.email}</p>
                                        <p className="text-sm text-gray-500">{teacher.department}</p>
                                        <p className="text-sm text-gray-500">Schedule: {teacher.freeSlots.map(({ day, slotNumber }) => `${day} (Slot ${slotNumber})`).join(", ")}</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}