import React, { useEffect, useState } from 'react'
import getRequest from '../services/getRequest'
import Subjects from '../components/Subjects'

const departments = ['Computer', 'Mechanical', 'Civil', 'Electrical']

const AssignSubjects = () => {
    const [SE_subjects, setSE_subjects] = useState([])
    const [TE_subjects, setTE_subjects] = useState([])
    const [BE_subjects, setBE_subjects] = useState([])
    const [teachers, setTeachers] = useState([])
    const [department, setDepartment] = useState('')
    const [faculty, setFaculty] = useState('')
    const [selectedSubjects, setSelectedSubjects] = useState({})

    const handleSubjectChange = (subjectId) => {
        setSelectedSubjects(prev => ({
            ...prev,
            [subjectId]: !prev[subjectId],
        }))
    }

    const handleSubmit = () => {
        const assigned = Object.keys(selectedSubjects).filter(key => selectedSubjects[key])
        const allSubjects = [...SE_subjects, ...TE_subjects, ...BE_subjects]
        const selectedDetails = allSubjects.filter(subject => assigned.includes(subject._id))

        console.log('Assigned Subjects to Faculty:', {
            department,
            faculty,
            assignedSubjects: selectedDetails
        })
    }

    useEffect(() => {
        if (!department) return

        const loadTeachersData = async () => {
            try {
                const [teachersRes, subjectsRes] = await Promise.all([
                    getRequest(`/api/teacher/view-teacher-by-department/${department}`),
                    getRequest(`/api/subject/view-subjects-by-department/${department}`)
                ])

                setTeachers(teachersRes.teachers || [])
                setSE_subjects(subjectsRes.SE_subjects || [])
                setTE_subjects(subjectsRes.TE_subjects || [])
                setBE_subjects(subjectsRes.BE_subjects || [])
            } catch (err) {
                console.error("Failed to load data", err)
            }
        }

        loadTeachersData()
    }, [department])

    const renderDropdown = (label, value, setter, options) => (
        <select
            value={value}
            onChange={e => setter(e.target.value)}
            className="border p-2 rounded"
        >
            <option value="">{label}</option>
            {options.map((opt, i) =>
                typeof opt === 'object' ? (
                    <option key={opt._id} value={opt._id}>{opt.name}</option>
                ) : (
                    <option key={i} value={opt}>{opt}</option>
                )
            )}
        </select>
    )

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Assign Subjects to Faculty</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {renderDropdown('Select Department', department, setDepartment, departments)}
                {renderDropdown('Select Faculty', faculty, setFaculty, teachers)}
            </div>

            <Subjects
                year="SE Subjects"
                handleSubjectChange={handleSubjectChange}
                subjects={SE_subjects}
                selectedSubjects={selectedSubjects}
            />
            <Subjects
                year="TE Subjects"
                handleSubjectChange={handleSubjectChange}
                subjects={TE_subjects}
                selectedSubjects={selectedSubjects}
            />
            <Subjects
                year="BE Subjects"
                handleSubjectChange={handleSubjectChange}
                subjects={BE_subjects}
                selectedSubjects={selectedSubjects}
            />

            <div className="flex justify-center mt-6">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AssignSubjects
