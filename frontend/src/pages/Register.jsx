import React, { useState, useEffect } from "react";
import isEmpty from "../utils/isEmpty";
import postRequest from "../services/postRequest";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("")
    const [department, setDepartment] = useState("")
    const [message, setMessage] = useState("")
    const [token, setToken] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log({ name, email, password, role, department });

        const data = { name, email, password, role, department }
        const flag = isEmpty(data)

        if (flag) {

            setMessage('All fields are mandatory')
            setTimeout(() => {

                setMessage('')
            }, 2000)
        } else {

            const endPoint = '/api/auth/register'
            const response = await postRequest(endPoint, data)

            console.log('register', response)
            if (response.status !== 200) {

                setMessage(response.message)
                setTimeout(() => {

                    setMessage('')
                }, 2000)
            } else {

                navigate('/login')
            }
        }
    };

    useEffect(() => {

        const token = localStorage.getItem('token')
        if (token) {

            setToken(localStorage.getItem('token'))

            //   console.log('Token found:', token)
            navigate('/')
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-36 w-[60vw]">

                <p className="text-xl">{message}</p>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />

                <div className="mb-2">
                    <label className="mr-2">Role:</label>
                    <label className="mr-2">
                        <input
                            type="radio"
                            value="Admin"
                            checked={role === "Admin"}
                            onChange={(e) => setRole(e.target.value)}
                        /> Admin
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Teacher"
                            checked={role === "Teacher"}
                            onChange={(e) => setRole(e.target.value)}
                        /> Teacher
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Department:</label>
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="border p-2 w-full"
                    >
                        <option value="Civil">Civil</option>
                        <option value="Computer">Computer</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Mechanical">Mechanical</option>
                    </select>
                </div>

                {/* TODO: Add dropdown to select free slot -> slot number and day 
                    "freeSlots": [
                        { "day": "Monday", "slotNumber": 2 },
                        { "day": "Wednesday", "slotNumber": 4 }
                    ]
                */}

                <div className="flex flex-col">

                    <Link to={'/login'} className="">Already Have an account <span className="underline"> Login</span></Link>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4 hover:cursor-pointer" type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;