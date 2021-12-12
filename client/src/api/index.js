import axios from 'axios';

const url = 'http://localhost:5000/tasks';

export const fetchTasks = () => axios.get(url);
export const createTasks = (newTask) => axios.post(url, newTask);
export const updateTasks = (id, updatedTask) => axios.patch(`${url}/${id}`, updatedTask);
export const deleteTasks = (id) => axios.delete(`${url}/${id}`);