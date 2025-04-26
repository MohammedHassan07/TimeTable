import React, { useEffect, useState } from 'react'
import getRequest from '../services/getRequest'
import Theory from '../components/Theory'
import Practicals from '../components/Practicals'

const departments = ['Computer', 'Mechanical', 'Civil', 'Electrical']

const AssignSubjects = () => {
    const [SE_subjects, setSE_subjects] = useState([])
    const [TE_subjects, setTE_subjects] = useState([])
    const [BE_subjects, setBE_subjects] = useState([])

    const [SE_practicals, setSE_practicals] = useState([])
    const [TE_practicals, setTE_practicals] = useState([])
    const [BE_practicals, setBE_practicals] = useState([])

    const [teachers, setTeachers] = useState([])
    const [department, setDepartment] = useState('')
    const [faculty, setFaculty] = useState('')
    const [selectedSubjects, setSelectedSubjects] = useState({})
    const [selectedPracticals, setSelectedPracticals] = useState({})


    const handleSubjectChange = (subjectId) => {
        setSelectedSubjects(prev => ({
            ...prev,
            [subjectId]: !prev[subjectId],
        }))
    }

    const handlePracticalChange = (practicalId) => {
        setSelectedPracticals(prev => ({

            ...prev,
            [practicalId]: !prev[practicalId]
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

                setSE_practicals(subjectsRes.SE_practicals || [])
                setTE_practicals(subjectsRes.TE_practicals || [])
                setBE_practicals(subjectsRes.BE_practicals || [])

                // console.log(subjectsRes)


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

            {/* SE */}

            <div>
                <Theory
                    year="SE Subjects"
                    handleSubjectChange={handleSubjectChange}
                    subjects={SE_subjects}
                    selectedSubjects={selectedSubjects}
                />

                <Practicals
                    year="SE Practicals"
                    handlePracticalChange={handlePracticalChange}
                    practicals={SE_practicals}
                    selectedSubjects={selectedSubjects}
                />
            </div>

            {/* TE */}
            <div>

                <Theory
                    year="TE Subjects"
                    handleSubjectChange={handleSubjectChange}
                    subjects={TE_subjects}
                    selectedSubjects={selectedSubjects}
                />

                <Practicals
                    year="TE Practicals"
                    handlePracticalChange={handlePracticalChange}
                    practicals={TE_practicals}
                    selectedPracticals={selectedPracticals}
                />
            </div>


            {/* BE */}
            <div>

                <Theory
                    year="BE Subjects"
                    handleSubjectChange={handleSubjectChange}
                    subjects={BE_subjects}
                    selectedSubjects={selectedSubjects}
                />

                <Practicals
                    year="BE Practicals"
                    handlePracticalChange={handlePracticalChange}
                    practicals={BE_practicals}
                    selectedPracticals={selectedPracticals}
                />

            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={handleSubmit}
                    className="px-7 py-1.5 bg-gray-900 text-white  rounded-lg hover:bg-gray-800 hover:cursor-pointer"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AssignSubjects
