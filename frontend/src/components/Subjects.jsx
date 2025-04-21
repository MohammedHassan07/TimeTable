import React from 'react'

const Subjects = ({ year, handleSubjectChange, subjects, selectedSubjects }) => {
    return (
        <div className="mb-6 w-full">
            <h2 className="text-gray-800 text-xl font-semibold mb-3">{year}</h2>

            {subjects.length === 0 ? (
                <p className="text-gray-500 mb-4">No subjects available.</p>
            ) : (
                subjects.map(subject => (
                    <div key={subject._id} className="mb-4">
                        <label className="flex items-center space-x-4">
                            <input
                                type="checkbox"
                                checked={!!selectedSubjects[subject._id]}
                                onChange={() => handleSubjectChange(subject._id)}
                                className="accent-blue-600"
                            />
                            <span>{subject.name}</span>
                            <span className="text-sm text-gray-600">({subject.abbreviation})</span>
                            <span className="text-sm text-gray-400">Code: {subject.subjectCode}</span>
                        </label>
                    </div>
                ))
            )}
        </div>
    )
}

export default Subjects
