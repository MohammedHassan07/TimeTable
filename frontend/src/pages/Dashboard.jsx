import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate()
    useEffect(() => {

        const token = localStorage.getItem('token')
        if (token) {

            console.log('Token found:', token)
        } else {
            navigate('/login')
        }
    }, [])
  
    return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
