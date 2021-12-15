import React, {useState} from 'react';
import styles from './Auth.module.scss';
import { useNavigate, Link } from 'react-router-dom';

import { TextField, Button, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import {MdVisibility} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import {signin} from "../../actions/auth"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const initialState = {
    email: '',
    password: '',
}

const Auth = () => {

    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPass((prev) => !prev);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data, e) =>{
        e.preventDefault();

        dispatch(signin(data, navigate));
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onError = (errors, e) => console.log(errors, e);

    const switchMode = () => {
        setShowPass(false);
    }


    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        password: Yup.string()
          .required('Password is required')
          .min(5, 'Password must be at least 5 characters')
          .max(40, 'Password must not exceed 40 characters')
      });
      
    const {
        register,
        handleSubmit,
        formState: { errors }
        } = useForm({
        resolver: yupResolver(validationSchema)
    });


    return (
        <div className={styles.body}>
            <h2>Sign In</h2>
            <form className={styles.container} onSubmit={handleSubmit(onSubmit, onError)}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    required
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                    {...register('email')}
                    error={errors.email ? true : false}
                />
                    <span className={styles.errorMsg}>{errors.email?.message}</span>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPass ? "text" : "password"}
                    onChange={handleChange}
                    {...register('password')}
                    error={errors.password ? true : false}
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position='end'>
                                <IconButton onClick={handleShowPassword}>{<MdVisibility/>}</IconButton>
                            </InputAdornment>
                        )
                    }}
                    autoComplete="current-password"
                />
                    <span className={styles.errorMsg}>{errors.password?.message}</span>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        name="switchBtn"
                        variant='outlined'
                        {...register('switchBtn')}
                        component={Link} 
                        to="/registration"
                    >
                        Sign Up
                    </Button>
            </form>
        </div>
    )
}


export default Auth;
