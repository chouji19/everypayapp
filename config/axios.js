import axios from 'axios';

const axiosClient = axios.create({
    // baseURL: `http://localhost:4000/api`
    // baseURL: `http://192.168.0.5:4000/api`
    baseURL: `https://everypay.xyz/api`
});


export default axiosClient;