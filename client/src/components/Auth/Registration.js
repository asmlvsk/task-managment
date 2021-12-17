import React, {useState} from 'react'
import styles from './Auth.module.scss';
import { useNavigate, Link } from 'react-router-dom';

import { TextField, Button, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import {MdVisibility} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import {signup} from "../../actions/auth";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const initialState = {
    nickname: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Registration = () => {

    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPass((prev) => !prev);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data, e) =>{
        e.preventDefault();

        dispatch(signup(data, navigate));
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onError = (errors, e) => console.log(errors, e);

    const validationSchema = Yup.object().shape({
        nickname: Yup.string()
          .required('Nickname is required')
          .min(6, 'Username must be at least 6 characters')
          .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        password: Yup.string()
          .required('Password is required')
          .min(5, 'Password must be at least 5 characters')
          .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
          .required('Confirm Password is required')
          .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
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
            <h2>Sign Up</h2>

            <form className={styles.container} onSubmit={handleSubmit(onSubmit, onError)}>

            <TextField
                margin="normal"
                required
                fullWidth
                label="Your nickname"
                name="nickname"
                autoFocus
                onChange={handleChange}
                inputProps={{ minLength: 3, }}
                {...register('nickname')}
                error={errors.nickname ? true : false}
            />

            <span className={styles.errorMsg}>{errors.nickname?.message}</span>

            <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                required
                name="email"
                autoComplete="email"
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

            <TextField 
                name="confirmPassword"
                label="Repeat Password" 
                onChange={handleChange} 
                type="password" 
                fullWidth 
                {...register('confirmPassword')} 
                error={errors.confirmPassword ? true : false}
            />

            <span className={styles.errorMsg}>{errors.confirmPassword?.message}</span>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
            </Button>

            <Button
                fullWidth
                name="switchBtn"
                variant='outlined'
                {...register('switchBtn')}
                component={Link} 
                to="/auth"
            >
                Sign In
            </Button>
            
            </form>
        </div>
    )
}

export default Registration;
