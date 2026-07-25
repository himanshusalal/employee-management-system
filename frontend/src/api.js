import axios from "axios";


// Axios instance create
const API = axios.create({

    baseURL: import.meta.env.VITE_API_URL

});


// Request interceptor (JWT token bhejne ke liye)
API.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if(token){

            config.headers.Authorization = 
            `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);


export default API;















