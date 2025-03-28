import { useState } from 'react';
import { BookOpen, Code, Calendar, ChevronDown, Plus, FlaskConical, View } from 'lucide-react';

export default function Subjects() {

    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [subjects, setSubjects] = useState([{ name: '', code: '', abbreviation: '' }]);
    const [view, setView] = useState("list");
    const [practicals, setPracticals] = useState([{ name: '', lab: '' }]);


    const addPractical = () => {
        setPracticals([...practicals, { name: '', lab: '' }]);
    };

    const handleChange = (index, field, value) => {
        const newPracticals = [...practicals];
        newPracticals[index][field] = value;
        setPracticals(newPracticals);
    };

    // Add new subject field
    const addSubject = () => {
        setSubjects([...subjects, { name: '', code: '', abbreviation: '' }]);
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
            practicals
        };

        // Make Network Request 
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
                                        value={practical.lab}
                                        onChange={(e) => handleChange(index, 'lab', e.target.value)}
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
                        <p className="text-gray-700"><strong>Branch:</strong> {branch || 'Not selected'}</p>
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
                                        <p className="text-sm text-gray-500">{subject.code}</p>
                                    </div>
                                </div>
                            ))}
                            {practicals.map((practical, index) => (
                                <div key={index} className="p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{practical.name}</h3>
                                        <p className="text-sm text-gray-500">{practical.lab}</p>
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