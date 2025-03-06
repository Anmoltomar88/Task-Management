import React, { useEffect, useState } from 'react';
import '../signUp/SignUp.css';
import  axios  from "axios";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';

const styles = {
    width: "5.5cm",
    height: "5.5cm",
    objectFit: "cover",
    cursor: "pointer"
};

const SignIn = () => {
    const [Input,setInput]=useState({email:"",password:""});

    const navigate=useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        setInput((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };
    const handleSubmit = async (e) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,Input);
            sessionStorage.setItem("id",response.data._id);

            // const {login}= authActions;// dispatch(login());
            dispatch(authActions.login());

            navigate("/tasks");
            toast.success("Login Successfull");

        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
        }  
    }

    return (
        <div className="container signup">
            <div className="container">
                <div className="row my-2">
                    <div className="column ccccc col-lg-7 d-flex justify-content-center align-items-center ">
                        <div className='container d-flex flex-column  '>
                            <label htmlFor="email">Email</label>
                            <input
                                className='p-2 my-3'
                                type="email"
                                name="email"
                                id="email"
                                value={Input.email}
                                placeholder='Enter Your Email'
                                onChange={e => setInput(prev =>({...prev,email:e.target.value}))}
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                className='p-2 my-3'
                                type="password"
                                name="password"
                                id="password"
                                value={Input.password}
                                placeholder='Enter Your Password'
                                onChange={(e)=>handleChange(e)}
                            />
                            <button className='Signup-btn' onClick={(e)=>handleSubmit(e)}>SignIn</button>
                        </div>
                    </div>
                    <div className="column col-left col-lg-5 d-flex justify-content-center align-items-center flex-column">
                        <div>
                          <h1 className="text-center heading">
                            SIGN IN
                        </h1>  
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
