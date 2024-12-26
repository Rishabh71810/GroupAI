// filepath: /c:/Users/Rishabh Sharma/OneDrive/Desktop/GroupAI/frontend/src/pages/SignupPage.jsx
import {React, useState, useContext} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from '../config/axios'
import { UserContext } from '../context/user.context';

function SignupPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setUser}=useContext(UserContext)
    
    const navigate = useNavigate();
    function submitHandler(e){
        e.preventDefault()
        axios.post('/users/register', {email, password}).then((res)=>{
            console.log(res.data);
            localStorage.setItem('token',res.data.token)
            setUser(res.data.user);
            navigate('/'); 
        }).catch((err)=>{
            console.log(err.response.data)
        })
    }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form
         onSubmit={submitHandler}
         >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
            onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
            onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;