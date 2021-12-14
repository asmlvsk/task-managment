import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode';
import styles from './NavBar.module.scss';

export const NavBar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () =>{
        dispatch({type: LOGOUT});

        navigate('/');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <nav className={styles.navBar}>

            <Link to="/" className={styles.logo}>TasksApp</Link>

            <div>
                {user ? (
                    <div>
                        <div>{user.result.nickname}</div>
                        <button onClick={logout}>Logout</button>
                    </div>
                ): (
                    <Link to="auth">Sign In</Link>
                )}
            </div>

        </nav>
    )
}
