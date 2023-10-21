import axios from "axios";
import { API_URL } from "../config/app-configs";

const getAuthHeader = (jwt) => {
    return { headers: { Authorization: `Bearer ${jwt}` }};
};

const apiService = {
    login: (email, password) => {
        return axios.post(`${API_URL}/auth/login`, {
            email,
            password
        });
    },
    register: () => {

    },
    getUser: (jwt) => {
        return axios.get(`${API_URL}/user`, getAuthHeader(jwt));
    },
    updateUser: () => {

    },
    getTasks: (jwt) => {
        return axios.get(`${API_URL}/tasks`, getAuthHeader(jwt));
    }
};

export default apiService;