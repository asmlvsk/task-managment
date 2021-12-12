import React, {useEffect, useState} from "react";
import globals from "../src/globals.scss";
import styles from "../src/App.module.scss";
import Tasks from "./components/Tasks/Tasks";
import Modal from "./components/Form/Form";

import {getTasks} from './actions/tasks'

import { useDispatch } from "react-redux";

const App = () => {

    const [modal, setModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const Toggle = () => setModal(!modal);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch])

    return(
        <>
            <div className={styles.body}>
                <nav className={styles.navBar}>

                    <div className={styles.logo}>TasksApp</div>

                    <div className={styles.items}>
                        <div className={styles.item}>Tasks</div>
                        <div className={styles.item}>Login</div>
                    </div>

                </nav>
                <section className={styles.tasks__section}>

                    <div className={styles.tasks__actions}>
                        <div>Add your Task</div>
                        <div className={styles.btn_style}>
                            <button className={styles.btn} onClick={() => Toggle()}>+</button>
                            <Modal setCurrentId={setCurrentId} show={modal} title="My Modal" close={Toggle}/>
                        </div>
                        
                    </div>

                    <div className={styles.tasks}>
                        <Tasks setCurrentId={setCurrentId} currentId={currentId}/>
                    </div>

                </section>
            </div>
        </>
    );
}

export default App;