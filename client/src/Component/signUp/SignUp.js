import React, { useState,useRef } from 'react';
import './SignUp.css';
import axios from 'axios';
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [input, setInput] = useState({ email: "", username: "", password: "" });
    const errorRef=useRef("");

    const navigate =useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(name=="email"){
            const emailPattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                errorRef.current="Please enter a valid email address.";
            } else {
                errorRef.current="";
            }
        }

        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
        
        if(errorRef.current){
            toast.error(errorRef.current);
            return;
        }
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, input);
            setInput({ email: "", username: "", password: "" });
            toast.success("Sign up successful");
            navigate("/signIn");
        } catch (error) {
            console.error("Error:", error.response.data.message || "An error occurred");
            toast.error(error.response.data.message || "An error occurred");
        }
    };

    return (
        <div className="container signup">
            <div className="container">
                <div className="row my-2">
                    <div className="column ccccc col-lg-7 d-flex justify-content-center align-items-center ">
                        <div className='container d-flex flex-column w-50 '>
                            <label htmlFor="email">Email</label>
                            <input
                                className='p-2 my-3'
                                type="email"
                                name="email"
                                id="email"
                                placeholder='Enter Your Email'
                                value={input.email}
                                onChange={handleChange}
                            />
                            {errorRef.current && 
                            ( <div style={{ color: 'red' }}>
                                {errorRef.current}
                                </div>
                            )}
                            <label htmlFor="username">Username</label>
                            <input
                                className='p-2 my-3'
                                type="text"
                                name="username"
                                id="username"
                                placeholder='Enter Your Username'
                                value={input.username}
                                onChange={handleChange}
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                className='p-2 my-3'
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Enter Your Password'
                                value={input.password}
                                onChange={handleChange}
                            />
                            <button className='Signup-btn' onClick={submit}>SignUp</button>
                        </div>
                    </div>

                    <div className="column col-left col-lg-5 d-flex justify-content-center align-items-center flex-column">
                        <h1 className="text-center heading">
                            SIGN UP
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;