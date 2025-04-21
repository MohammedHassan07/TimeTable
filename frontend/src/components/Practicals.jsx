import React from 'react';

const Practical = ({ year, handlePracticalChange, practicals, selectedPracticals }) => {
    return (
        <div className="mb-6 w-full">
            <h2 className="text-gray-800 text-xl font-semibold mb-3">{year}</h2>

            {practicals.length === 0 ? (
                <p className="text-gray-500 mb-4">No practicals available.</p>
            ) : (
                practicals.map(practical => (
                    <div key={practical._id} className="mb-4">
                        <label className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-1 md:space-y-0">
                            <input
                                type="checkbox"
                                checked={!!selectedPracticals[practical._id]}
                                onChange={() => handlePracticalChange(practical._id)}
                                className="accent-green-600"
                            />
                            <span className="font-medium">{practical.name}</span>
                            <span className="text-sm text-gray-600">Lab: {practical.labName}</span>
                        </label>
                    </div>
                ))
            )}
        </div>
    );
};

export default Practical;
