import React, {  useContext, useState } from 'react'
import { MdOutlineClose } from "react-icons/md";
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
import {toast} from 'react-toastify'
import Cookies from 'js-cookie'

const LoginPopup = ({setShowLogin}) => {

    const {url} = useContext(StoreContext)

    const [currState,serCurrState] = useState("Login")
    const [data,setData] = useState({
        username:"",
        email:'',
        password:""
    })


    const onChangeHandler = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setData(data => ({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        
        let newUrl = url
        if(currState === "Login"){
            newUrl += "/restaurant/user/login"
        }else{
            newUrl += '/restaurant/user/register'
        }
        try {
            const response = await axios.post(newUrl , data);
            if (currState === "Login") {
                const token = await response.data.token
                Cookies.set("jwt_token", token, {expires:24})
                toast.success('Login Successfully')
            }else{
                toast.success("Register Successfully")
            }
               
            setData({
                username:'',
                email:'',
                password:''
            })
                
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        }
    }


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <button type='button' onClick={() => setShowLogin(false)}>
                        <MdOutlineClose/>
                    </button>
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : 
                    <input type="text" name='username' onChange={onChangeHandler} value={data.username} placeholder="Your name" required />
                    }
                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder="Your email" required />
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />
                </div>
                <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" 
                ?<p>Create new account? <span onClick={() => serCurrState("Sign Up")}>Click here</span></p>
                :<p>Already have an account? <span onClick={() => serCurrState("Login")}>Login here</span></p>
                }
            </form> 
        </div>
    )
}

export default LoginPopup
