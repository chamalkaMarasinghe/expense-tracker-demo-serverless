import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth'
import {auth} from '../../firebase'

const Login = () => {

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [registerError, setRegisterError] = useState(false);

    const handleLogin = (e) => {

        e.preventDefault();

        signInWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                setLoginError(false);
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                setLoginError(true);
            });
    }

    const handleRegister = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                setRegisterError(false);
                // Signed up
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                console.log(error.message);
                setRegisterError(true);
            });
    }

    return(
        <div className="login-page-wrapper">
            <div className="login-form-wrapper">
                <form method="POST" className="login-form">
                    <div className="login-form-field-container">
                        <input className="input-fields" type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="login-form-field-container">
                        <input className="input-fields" type="password" name="pw" placeholder="Password" value={pw} onChange={(e) => {setPw(e.target.value)}}/>
                    </div>
                    <div className="login-form-field-container">
                        <input type="submit" name="submit" value="Log in" onClick={(e) => {handleLogin(e)}} />
                    </div>
                    {
                        loginError ? <span className="login-err"><center>Invalid email or passowrd!</center></span> : null
                    }
                    <p className="switch-link" 
                        onClick={() => {
                            document.getElementsByClassName("login-form")[0].style.marginLeft='-100%';
                        }}
                    >
                        Haven't Registered yet? Sign up
                    </p>
                </form>
                <form method="POST" className="register-form">
                    <div className="register-form-field-container">
                        <input className="input-fields" type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="register-form-field-container">
                        <input className="input-fields" type="password" name="pw" placeholder="Password" value={pw} onChange={(e) => {setPw(e.target.value)}}/>
                    </div>
                    <div className="register-form-field-container">
                        <input type="submit" name="Register" value="Register" onClick={(e) => {handleRegister(e)}} />
                    </div>
                    {
                        registerError ? <span className="login-err"><center>Email alrady in use or Password should contain at least 6 characters</center></span> : null
                    }
                    <p className="switch-link"
                        onClick={() => {
                            document.getElementsByClassName("login-form")[0].style.marginLeft='0px';
                        }}
                    >
                        Already registered? Sign in
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;