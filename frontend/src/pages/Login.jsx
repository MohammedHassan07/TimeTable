import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import postRequest from "../services/postRequest";
import isEmpty from "../utils/isEmpty";


function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { email, password }
        const flag = isEmpty(data)

        if (flag) {

            setMessage('All fields are mandatory')
            setTimeout(() => {

                setMessage('')
            }, 2000)
        } else {

            const endPoint = '/api/auth/login'
            const response = await postRequest(endPoint, data)

            console.log('login', response.data.token)

            localStorage.setItem('token', response.data.token)
            if (response.status !== 200) {

                setMessage(response.message)
                setTimeout(() => {

                    setMessage('')
                }, 2000)
            } else {

                navigate('/')
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-36 w-[60vw]">

            <p className="text-xl">{message}</p>
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

                <div className="flex flex-col">

                    <Link to={'/register'}>Dont Have an account Register here</Link>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:cursor-pointer" type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
