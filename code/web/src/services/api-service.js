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
    register: ({ name, email, profile_image, password }) => {
        const user = { name, email, profile_image, password };
        return axios.post(`${API_URL}/auth/register`, user);
    },
    getUser: (jwt) => {
        return axios.get(`${API_URL}/user`, getAuthHeader(jwt));
    },
    updateUser: (jwt, { name, email, profile_image }) => {
        const user = { name, email, profile_image };
        return axios.post(`${API_URL}/user`, user, getAuthHeader(jwt));
    },
    getTasks: (jwt) => {
        return axios.get(`${API_URL}/tasks`, getAuthHeader(jwt));
    },
    createTask: (jwt, { priority, due_date, title, description, status }) => {
        const parsedPriority = parseInt(priority, 10);
        const newTask = { priority: parsedPriority, due_date, title, description, status };
        return axios.post(`${API_URL}/tasks`, newTask, getAuthHeader(jwt));
    },
    updateTask: (jwt, id, { priority, due_date, title, description, status }) => {
        const parsedPriority = parseInt(priority, 10);
        const updatedTask = { priority: parsedPriority, due_date, title, description, status };
        return axios.post(`${API_URL}/tasks/${id}`, updatedTask, getAuthHeader(jwt));
    },
};

export default apiService;