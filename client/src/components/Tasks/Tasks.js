import React from 'react';

import { useSelector } from 'react-redux';

import Task from './Task/Task';

import styles from './Tasks.module.scss';

const Tasks = ({setCurrentId, currentId}) => {

    const tasks = useSelector((state) => state.tasks);

    console.log(tasks);

    return (
        !tasks.length ? <div>Loading...</div> : (
            <div className={styles.body}>
                {tasks.map((task) => (
                    <div className={styles.tasks_container} key={task._id}>
                        <Task task={task} setCurrentId={setCurrentId} currentId={currentId}/>
                    </div>
                ))}
            </div>
        )
    );
}

export default Tasks;
