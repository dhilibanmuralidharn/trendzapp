import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreateAccount.css'
import TrendzContext from '../../context/TrendzContext'

const CreateAccount = () => {
    const { addAccountDetails } = useContext(TrendzContext)
    const navigate = useNavigate();
    const [accountDetails, setAccountDetails] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})

    const handleChanges = event => {
        const { name, value } = event.target
        setAccountDetails({
            ...accountDetails,
            [name]: value,
        })
    }

    const validateForm = () => {
        const newErrors = {}

        if (!accountDetails.username) {
            newErrors.username = 'Username is required.'
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!accountDetails.email || !emailPattern.test(accountDetails.email)) {
            newErrors.email = 'Please enter a valid email.'
        }

        if (!accountDetails.password) {
            newErrors.password = 'Password is required.'
        }

        if (accountDetails.password !== accountDetails.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            addAccountDetails(accountDetails)
        }
        navigate('/login')
    }

    return (
        <div className='account-container'>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            name='username'
                            value={accountDetails.username}
                            onChange={handleChanges}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.username ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'}`}
                            placeholder="Enter your username"
                            required
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name='email'
                            value={accountDetails.email}
                            onChange={handleChanges}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'}`}
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            value={accountDetails.password}
                            onChange={handleChanges}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'}`}
                            placeholder="Enter your password"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name='confirmPassword'
                            onChange={handleChanges}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'}`}
                            placeholder="Confirm your password"
                            required
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Register</button>
                </form>
            </div>
        </div>
    )
}

export default CreateAccount
