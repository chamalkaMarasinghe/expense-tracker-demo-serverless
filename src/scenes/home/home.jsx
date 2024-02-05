import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return(
        <div className='app-inner-wrapper'>
            <p className='hello-text'>Hello expense tracker</p>
            <button onClick={() => {navigate('/login')}}>Get In</button>
        </div>
    );
};

export default Home;