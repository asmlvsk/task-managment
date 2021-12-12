import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';

export const getTasks = () => async (dispatch) => {

    try {
        const { data } = await api.fetchTasks();

        dispatch({type: FETCH_ALL, payload: data});

    } catch (error) {
        console.log(error);
    }
}

export const createTasks = (task) => async (dispatch) => {

    try {
        const { data } = await api.createTasks(task);

        dispatch({type: CREATE, payload: data});

    } catch (error) {
        console.log(error);
    }
}

export const updateTasks = (id, task) => async (dispatch) => {

    try {
       const { data } =  await api.updateTasks(id, task);

       dispatch({type: UPDATE, payload: data});

    } catch (error) {
        console.log(error);
    }
}

export const deleteTasks = (id) => async (dispatch) => {

    try {
       await api.deleteTasks(id);

       dispatch({type: DELETE, payload: id});

    } catch (error) {
        console.log(error);
    }
}