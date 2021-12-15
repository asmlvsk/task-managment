import React, {useState} from 'react';
import moment from 'moment';
import Modal from "../../Form/Form";
import styles from './Task.module.scss';

import {AiOutlineEdit} from 'react-icons/ai';
import {AiOutlineDelete} from 'react-icons/ai';
import { MdExpandMore } from 'react-icons/md';

import { useDispatch } from 'react-redux';

import { deleteTasks } from '../../../actions/tasks';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

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
                        task.priority === 2 ? <div className={styles.lowStatus}>Low</div> : 
                        task.priority === 1 ? <div className={styles.mediumStatus}>Medium</div>  : 
                        task.priority === 0 ? <div className={styles.highStatus}>High</div>  : null}
                    </div>
                </div>
                <div className={styles.container}>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<MdExpandMore />}
                        >
                            {task.title}
                        </AccordionSummary>
                        <AccordionDetails>
                            {task.description}
                        </AccordionDetails>
                    </Accordion>
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