import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";

import Tasks from "../Tasks/Tasks";
import Modal from "../Form/Form";

import {getTasks} from '../../actions/tasks';

import styles from "./Main.module.scss";

const Main = () => {

    const Toggle = () => setModal(!modal);
    const [modal, setModal] = useState(false);

    const [currentId, setCurrentId] = useState(null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch])

    return (
        <section className={styles.tasks__section}>
            <div className={styles.tasks}>
                {
                    !user?.result?.nickname ? <h2>Please sign in to create posts.</h2> :
                    <div>
                        <div className={styles.tasks__actions}>
                        <div>Add your Task</div>
                        <div className={styles.btn_style}>
                            <button className={styles.btn} onClick={() => Toggle()}>+</button>
                            <Modal setCurrentId={setCurrentId} show={modal} title="My Modal" close={Toggle}/>
                        </div>
                        
                        </div>

                        <Tasks setCurrentId={setCurrentId} currentId={currentId}/>
                    </div>
                }

            </div>

        </section>
    )
}

export default Main;
