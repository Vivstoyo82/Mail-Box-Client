import React from 'react'
import { useState, useRef } from 'react';
import classes from './Signup.module.css';
import pexel from '../asset/pexel.jpg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth-slice';

const Signup = () => {

    const [hasAccount, setHasAccount] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const hasAccountHandler = () => {
        setHasAccount((preState) => !preState);
    };

    let url;
    if (hasAccount) {
        url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMGWjyAJ7fh76jTDCZajvD7LRHQ-Bs4QA';
    } else {
        url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMGWjyAJ7fh76jTDCZajvD7LRHQ-Bs4QA';
    }

    const loginFormHandler = async (event) => {
        event.preventDefault();

        if (
            !hasAccount &&
            passwordRef.current.value !== confirmPasswordRef.current.value
        ) {
            alert('Password and Confirmed password are different');
            return;
        }

        try {
            const respense = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await respense.json();

            if (respense.ok) {
                localStorage.setItem('idToken', JSON.stringify(data));
                dispatch(authActions.login());
                // navigate('/home');
                navigate('/compose');
                localStorage.setItem("email", data.email.replace(/[.]/g, ""));
            } else {
                throw data.error;
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={classes['main-form']} >
            <form className={classes.form} style={{
                backgroundImage: `url(${pexel})`, backgroundRepeat: "no-repeat", backgroundSize: "cover",
                margin: 'auto', height: 'auto', borderRadius: 6
            }} onSubmit={loginFormHandler}>
                <div className={classes.head}><h3>MAIL BOX CLIENT</h3></div>
                <div className={classes.title}>{hasAccount ? <h5>LOGIN</h5> : <h5>SIGN UP</h5> }</div>
                <input type='email' placeholder='Email' ref={emailRef} required />
                <input
                    type='password'
                    placeholder='Password'
                    ref={passwordRef}
                    required
                />
                {!hasAccount && (
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        ref={confirmPasswordRef}
                        required
                    />
                )}
                <div className={classes.button}>
                    <button type='submit'>{hasAccount ? 'LOGIN' : 'SIGN UP'}</button>
                </div>
            </form>
            <div onClick={hasAccountHandler} className={classes.hasAccount}>
                {hasAccount
                    ? 'Don`t have an account? Sign Up'
                    : 'Have an account? Sign In'}
            </div>
        </div>
    )
}

export default Signup