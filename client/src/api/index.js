import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000/'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchTasks = () => API.get('/tasks');
export const createTasks = (newTask) => API.post('/tasks', newTask);
export const updateTasks = (id, updatedTask) => API.patch(`/tasks/${id}`, updatedTask);
export const deleteTasks = (id) => API.delete(`/tasks/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);