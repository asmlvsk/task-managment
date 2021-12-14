import React from "react";
import globals from "../src/globals.scss";
import styles from "../src/App.module.scss";

import { NavBar } from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import Registration from "./components/Auth/Registration";

const App = () => {
    return(
        <BrowserRouter>
            <div className={globals}></div>
            <div className={styles.body}>
                <NavBar/>
                <Routes>
                    <Route path="/" exact element={<Main/>}/>
                    <Route path="/auth" exact element={<Auth/>}/>
                    <Route path="/registration" exact element={<Registration/>}/>
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;