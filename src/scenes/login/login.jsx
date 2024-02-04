import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth'
import {auth} from '../../firebase'

const Login = () => {

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();

        signInWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                setError(false);
                // Signed up 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                setError(true);
            });
    }

    return(
        <div>
            <p>log in</p>
            <form>
                <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" name="pw" placeholder="Password" value={pw} onChange={(e) => {setPw(e.target.value)}}/>
                <input type="submit" name="submit" onClick={(e) => {handleSubmit(e)}} />
                {
                    error ? <span>Invalid E-mail or Password!</span> : null
                }
            </form>
        </div>
    );
};

export default Login;