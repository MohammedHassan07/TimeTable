import { useState } from 'react';
import { BookOpen, Code, Calendar, ChevronDown, Plus, FlaskConical, View } from 'lucide-react';
import postRequest from '../services/postRequest'
import { ToastContainer, toast } from 'react-toastify';

export default function Subjects() {

    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [program, setProgram] = useState('');
    const [subjects, setSubjects] = useState([{ name: '', subjectCode: '', abbreviation: '' }]);
    const [view, setView] = useState("list");
    const [practicals, setPracticals] = useState([{ name: '', labName: '' }]);

    const addPractical = () => {
        setPracticals([...practicals, { name: '', labName: '' }]);
    };

    const handleChange = (index, field, value) => {
        const newPracticals = [...practicals];
        newPracticals[index][field] = value;
        setPracticals(newPracticals);
    };

    // Add new subject field
    const addSubject = () => {
        setSubjects([...subjects, { name: '', subjectCode: '', abbreviation: '' }]);
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
            program,
            department,
            year,
            semester,
            subjects,
            practicals
        };
        console.log(formData)

        // Make Network Request 
        const response = await postRequest('/api/subject/add-subject', formData)
        console.log(response)

        const notify = () => {
            if (response.status !== 201) {

                toast.error(response.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.success(response.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }
        };

        if (response.status !== 201) {

            notify()
        } else {
            notify()
            console.log('added')
        }
    };

    return (
        <div className="p-2 flex flex-col justify-center items-center w-full">
            <ToastContainer />
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
                    {/* department, Year, Semester Selection */}
                    <div className="grid grid-cols-4 gap-4 mb-6">

                        <div>
                            <label className="text-sm font-medium mb-1 flex items-center gap-1">
                                <ChevronDown className="h-4 w-4" /> Program
                            </label>
                            <select
                                value={program}
                                onChange={(e) => setProgram(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Program</option>
                                <option value="Degree">Degree</option>
                                <option value="Diploma">Diploma</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 flex items-center gap-1">
                                <ChevronDown className="h-4 w-4" /> Department
                            </label>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="Computer">Computer</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Civil">Civil</option>
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
                                <option value="FE">FE</option>
                                <option value="SE">SE</option>
                                <option value="TE">TE</option>
                                <option value="BE">BE</option>
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
                            <div key={index} className="grid grid-cols-3 gap-4 mb-3">
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
                                    <label className="text-sm font-medium mb-1 flex items-center gap-1">
                                        <Code className="h-4 w-4" /> Subject Abbreviation
                                    </label>
                                    <input
                                        type="text"
                                        value={subject.abbreviation}
                                        onChange={(e) => handleSubjectChange(index, 'abbreviation', e.target.value)}
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter subject Abbreviation"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-1 flex items-center gap-1">
                                        <Code className="h-4 w-4" /> Subject Code
                                    </label>
                                    <input
                                        type="text"
                                        value={subject.subjectCode}
                                        onChange={(e) => handleSubjectChange(index, 'subjectCode', e.target.value)}
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
                            className="flex items-center gap-1 text-blue-500 text-sm hover:cursor-pointer"
                        >
                            <Plus className="h-4 w-4" /> Add Subject
                        </button>
                    </div>

                    {/* Practicals */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-6">Practicals</h1>

                        {practicals.map((practical, index) => (
                            <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Subject Name</label>
                                    <input
                                        type="text"
                                        value={practical.name}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Lab Name</label>
                                    <input
                                        type="text"
                                        value={practical.labName}
                                        onChange={(e) => handleChange(index, 'labName', e.target.value)}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addPractical}
                            className="flex items-center gap-1 text-blue-500 mb-6 hover:cursor-pointer"
                        >
                            <Plus className="h-4 w-4" /> Add Practical
                        </button>

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 hover:cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <div className="bg-white rounded-lg shadow-sm w-full">

                    <div className="grid grid-cols-3 gap-4 mb-3">
                        <p className="text-gray-700"><strong>Department:</strong> {department || 'Not selected'}</p>
                        <p className="text-gray-700"><strong>Year:</strong> {year || 'Not selected'}</p>
                        <p className="text-gray-700"><strong>Semester:</strong> {semester || 'Not selected'}</p>
                    </div>
                    {subjects.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No subjects added yet. Click Create to add one.</div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {subjects.map((subject, index) => (
                                <div key={index} className="p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{subject.name}</h3>
                                        <p className="text-sm text-gray-500">{subject.abbreviation}</p>
                                        <p className="text-sm text-gray-500">{subject.subjectCode}</p>
                                    </div>
                                </div>
                            ))}
                            {practicals.map((practical, index) => (
                                <div key={index} className="p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{practical.name}</h3>
                                        <p className="text-sm text-gray-500">{practical.labName}</p>
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