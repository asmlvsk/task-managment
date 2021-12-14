import React, {useEffect, useState} from 'react';

import { useSelector } from 'react-redux';

import Task from './Task/Task';

import styles from './Tasks.module.scss';

const Tasks = ({setCurrentId, currentId}) => {

    const tasks = useSelector((state) => state.tasks);
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('inProgress');
    console.log(tasks);

    useEffect(() => {
        const sortArray = type => {
            const types = {
                inProgress: 'isDone',
                done: 'isDone',
                date: 'dueDate',
                priority: 'priority',
            };
            const sortProperty = types[type];
            const sorted = [...tasks].sort((a, b) => {
                if(sortProperty === "isDone" && sortProperty === false){
                    return a[sortProperty] - b[sortProperty];
                } else{
                    return b[sortProperty] - a[sortProperty];
                }
                
            });
            console.log(sorted);
            setData(sorted);
        };
        sortArray(sortType);
    }, [sortType])

    return (
        <>
        <div>
            <select onChange={(e) => setSortType(e.target.value)}>
                <option value="inProgress">In progress</option>
                <option value="done">Done</option>
                <option value="date">Date</option>
                <option value="priority">Priority</option>
            </select>
        </div>
        {!tasks.length ? 
        <div>Loading...</div> : 
        (
            <div className={styles.body}>
                {data.map((task) => (
                    <div className={styles.tasks_container} key={task._id}>
                        <Task task={task} setCurrentId={setCurrentId} currentId={currentId}/>
                    </div>
                ))}
            </div>
        )}
        </>

    );
}

export default Tasks;
