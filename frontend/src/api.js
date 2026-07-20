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















// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://employee-management-system-3-316w.onrender.com";

// export default API_URL;



// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000";

// export default API_URL;



// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://employee-management-system-3-316w.onrender.com";

// export default API_URL;