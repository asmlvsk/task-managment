import React from "react";
import globals from "../src/globals.scss";
import styles from "../src/App.module.scss";

import { NavBar } from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import Registration from "./components/Auth/Registration";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Confirmed } from "./components/Confirm/Confirmed";

const App = () => {
    return(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <div className={globals}></div>
                <div className={styles.body}>
                    <NavBar/>
                    <hr className="solid"></hr>
                    <Routes>
                        <Route path="/" exact element={<Main/>}/>
                        <Route path="/auth" exact element={<Auth/>}/>
                        <Route path="/registration" exact element={<Registration/>}/>
                        <Route path="/confirmation" exact element={<Confirmed/>}/>
                    </Routes>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

const theme = createTheme({
    palette: {
      mode: "dark",
      primary:{
          main: '#775dc0'
      }
    },
  });

export default App;