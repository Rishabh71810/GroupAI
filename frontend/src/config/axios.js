import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Add a request interceptor to include the token on every request
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage on each request
        const token = localStorage.getItem('token');
        
        // If token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;