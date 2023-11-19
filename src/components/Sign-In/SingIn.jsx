import './SignIn.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import {actions, AsyncUserAuth, productsSelector} from "../../redux/reducers/productsReducer";


export default function SignIn(){

    //creating refs for email and password input
    const emailRef = useRef();
    const passwordRef = useRef();


    const dispatch = useDispatch();
    const navigate = useNavigate();
     function handleSubmit(e){
        e.preventDefault();
        //dispatching actions to authenticate user
        dispatch(AsyncUserAuth({
            email: emailRef.current.value, 
            pass: passwordRef.current.value})).then((args) => {
                console.log(args);
            })
    }
    var {user} = useSelector( productsSelector);
        if(user){
            navigate('/');
        }

    return(
        <>
        <div className="LoginPage">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="loginTitle">Sign In</h2>
                <input type="email" name="email" className="loginInput" placeholder="Enter Email" ref={emailRef} required/>
                <input type="password" name="password" className="loginInput" placeholder="Enter Password" ref={passwordRef} required/>
                <button className="loginBtn" >Sign In</button>
                
                <a className="" href="/SignUp" style={{textDecoration: "none", color: "rgb(34, 73, 87)", fontFamily: "Quicksand"}}>
                    <p style={{fontWeight: "600", margin: "0px" }} >Or SignUp instead</p>
                </a>
            </form>
        </div>
        </>
    )
}