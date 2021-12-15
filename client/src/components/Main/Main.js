import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import Tasks from "../Tasks/Tasks";
import Modal from "../Form/Form";

import {sortedTasks} from '../../actions/tasks';

import styles from "./Main.module.scss";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {RiTaskLine} from 'react-icons/ri';

const Main = () => {

    const Toggle = () => setModal(!modal);
    const [modal, setModal] = useState(false);

    const [currentId, setCurrentId] = useState(null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('isDone');

    useEffect(() => {
        const sortArray = (type) => {
            const sorted = dispatch(sortedTasks(type));
            setData(sorted);
            console.log(sorted);
        };
        sortArray(sortType);
        //dispatch(getTasks());
    }, [sortType])

    return (
        <section className={styles.tasks__section}>
            <div className={styles.tasks}>
                {
                    !user?.result?.nickname ? 
                    <div className={styles.welcome}>
                        <RiTaskLine className={styles.icon}/>
                        <h3 className={styles.title}>Welcome to <span>Tasks App</span>!</h3>
                        <h5 className={styles.supTitle}>Please, <Link className={styles.links} to="auth">Sign In</Link> or <Link className={styles.links} to="registration">Sign Up</Link> to start!</h5>
                    </div> 
                    :
                    <div>

                        <div className={styles.tasks__actions}>
                            <div>Add your Task</div>
                            <div className={styles.btn_style}>
                                <button className={styles.btn} onClick={() => Toggle()}>+</button>
                                <Modal setCurrentId={setCurrentId} show={modal} title="My Modal" close={Toggle}/>
                            </div>
                        </div>

                        <div className={styles.select}>
                            <Select
                                label="Priority"
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                >
                                <MenuItem value="isDone">In progress</MenuItem>
                                <MenuItem value="isDone:desc">Done</MenuItem>
                                <MenuItem value="dueDate:desc">Date</MenuItem>
                                <MenuItem value="priority">Priority</MenuItem>
                            </Select>
                        </div>

                        <Tasks setCurrentId={setCurrentId} currentId={currentId}/>
                    </div>
                }

            </div>

        </section>
    )
}

export default Main;
