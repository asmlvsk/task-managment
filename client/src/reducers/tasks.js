import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_SORTED } from "../constants/actionTypes";

const Tasks = (tasks = [], action) =>{
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FETCH_SORTED:
            return action.payload;
        case CREATE:
            return [...tasks, action.payload];
        case UPDATE:
            return tasks.map((task) => task._id === action.payload._id ? action.payload : task);
        case DELETE:
            return tasks.filter((task) => task._id !== action.payload);
        default:
            return tasks;
    }
}

export default Tasks;