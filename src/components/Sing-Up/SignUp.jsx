import './SignUp.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import {actions, AsyncCreateUser, productsSelector} from "../../redux/reducers/productsReducer";

export default function SignUp(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    function handleSubmit(e){
        e.preventDefault();
        dispatch(AsyncCreateUser({name:nameRef.current.value, email:emailRef.current.value, password:passRef.current.value})) 

        // :null;
    }
    var {user} = useSelector( productsSelector);
    if(user){
        navigate('/');
    }
    return(
        <>
        <div className="SignUpPage">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="loginTitle">Sign Up</h2>
                <input type="text" name="name" className="loginInput" placeholder="Enter Name" ref = {nameRef}/>
                <input type="email" name="email" className="loginInput" placeholder="Enter Email" ref={emailRef}/>
                <input type="password" name="password" className="loginInput" placeholder="Enter Password" ref={passRef}/>
                
                <button className="loginBtn">Sign Up</button>
            </form>
        </div>
        </>
    )
}