import React, {useState} from 'react';
import moment from 'moment';
import Modal from "../../Form/Form";
import styles from './Task.module.scss';

import {AiOutlineEdit} from 'react-icons/ai';
import {AiOutlineDelete} from 'react-icons/ai';

import { useDispatch } from 'react-redux';

import { deleteTasks } from '../../../actions/tasks';

const Task = ({task, setCurrentId, currentId}) => {

    const [modal, setModal] = useState(false);

    const Toggle = () => setModal(!modal);
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    return (
        <>
            {(user?.result?._id === task?.creator) && (
                <div className={styles.body}>
                <div className={styles.header}>
                    <div className={styles.done}>{task.isDone ? <h4 style={{color: 'green'}}>Done</h4> : <h4 style={{color: 'yellow'}}> In progress</h4>}</div>
                    <div className={styles.priority}>
                        {
                        task.priority === 0 ? "Low" : 
                        task.priority === 1 ? "Medium" : 
                        task.priority === 2 ? "High" : null}
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.title}>{task.title}</div>
                    {/* <div className={styles.description}>{task.description}</div> */}
                </div>
                
                <div className={styles.footer}>
                    <div className={styles.btns}>
                        <AiOutlineEdit className={styles.btn} onClick={() => {Toggle(); setCurrentId(task._id);}}>Edit</AiOutlineEdit>

                        <AiOutlineDelete className={styles.btn} onClick={() => dispatch(deleteTasks(task._id))}>Delete</AiOutlineDelete>
                        <div>{task.nickname}</div>
                    </div>
                    <div className={styles.date}>{moment(task.dueDate).format('LLL')}</div>
                    <Modal currentId={currentId} setCurrentId={setCurrentId} show={modal} title="My Modal" close={Toggle}/>
                </div>
            </div>
        )}
        </>
    )
}

export default Task;