import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Authorization": `Bearer ${localStorage.getItem('token')}`  // Add token to all requests for authentication on the frontend side
    }
 })

 export default axiosInstance;