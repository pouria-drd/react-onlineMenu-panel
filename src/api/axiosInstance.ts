import axios from "axios";
// import { ACCESS_KEY } from "../constance/constance";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// api.interceptors.request.use(
//     (config) => {
//         const token = sessionStorage.getItem(ACCESS_KEY);
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default api;
