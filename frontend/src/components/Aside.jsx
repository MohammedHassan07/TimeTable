import React from 'react'
import { Link } from 'react-router-dom'

const Aside = () => {
    return (
        <>
            {/* aside */}
            <div className='min-h-screen bg-gray-800 w-72 flex p-2'>

                <ul className='flex flex-col justify-start items-start min-h-screen text-white w-full gap-4'>

                    <li className='border rounded-lg border-white p-2 w-full hover:cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition duration-300' >
                        <Link className='block w-full h-full' to={'/render-charts'}>Generate Report</Link>
                    </li>

                    <li
                        className='border rounded-lg border-white p-2 w-full hover:cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition duration-300' >
                        <Link className='block w-full h-full' to={'/teachers/create'}>Teachers</Link>
                    </li>

                    <li
                        className='border rounded-lg border-white p-2 w-full hover:cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition duration-300' >
                        <Link className='block w-full h-full' to={'/subjects'}>Subjects</Link>
                    </li>

                    <li className='border rounded-lg border-white p-2 w-full hover:cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition duration-300' >
                        <Link className='block w-full h-full' to={'/schedule'}>Generate Schedules</Link>
                    </li>

                    <li className='border rounded-lg border-white p-2 w-full hover:cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition duration-300'>Log out</li>
                </ul>
            </div>
        </>
    )
}

export default Aside
