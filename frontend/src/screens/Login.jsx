
import { Link , useNavigate} from 'react-router-dom';
import axios from '../config/axios'
import {UserContext} from '../context/user.context.jsx'
import { useState, useContext} from 'react';
function LoginPage() {

    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');    
    const navigate = useNavigate();   
    const {setUser} = useContext(UserContext);
    
    function submitHandler(e){
        // axios is used to send the email and password to login page from the backend
        e.preventDefault()
        axios.post('/users/login', {email, password}).then((res)=>{
            console.log(res.data);
            localStorage.setItem('token',res.data.token)
            setUser(res.data.user)
            navigate('/'); 
        }).catch((err)=>{
            console.log(err.response.data)
        })
    }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
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
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
