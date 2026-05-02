// import React, { useState } from "react";
// import { FaEye, FaSlash } from "react-icons/fa";
// import { useState } from "react";
// import "./SignUp.css";
// import { ToastContainer, toast } from "react-toastify";
// import "./App.css"
// import { useNavigate } from 'react-router'
import React, { useState } from 'react'
import {ToastContainer,toast} from "react-toastify"

import "./App.css"
import { useNavigate } from 'react-router'

function SignUp(){
    var [name,setName] = useState("")
    var [email,setEmail] = useState("")
    var [number,setNumber] = useState("")
    var [password,setPassword] = useState("")
    var navigate = useNavigate()


    function handleForm(e){
        e.preventDefault()
        if(name === "" || email == "" || number == "" || password == ""){
           toast.error("fill all the feilds")
        }else{
            if(name == "ananth" && email == "ananth" && password == "ananth" && number == "ananth"){
                toast.success("login done")
                setTimeout(() => {
                    navigate("/home")
                    
                }, 1000);
                  setName("")
                  setEmail("")
                  setNumber("")
                  setPassword("")
            }else{
                toast.warn("invalid details")
                setName("")
                setEmail("")
                setNumber("")
                setPassword("")
            }
            
        }

    }

    function handleLogin(){
        navigate("/login")
    }

    
    return(
        <div>
            <ToastContainer/>
            <form onSubmit={handleForm} action="">
            <label htmlFor="">Enter Name</label>
            <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" />
            <label htmlFor="">Enter Email</label>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" />
            <label htmlFor="">Enter Number</label>
            <input value={number} onChange={(e)=>{setNumber(e.target.value)}} type="text" />
            <label htmlFor="">Enter Password</label>
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" />
            <button type='submit'>submit</button>
           
            </form>
            <button onClick={handleLogin}>Login if account exists</button>

        </div>
    )
}


// const SignUp = () =>{
//      const [name,setName] = useState("")
//      const [email,setEmail] = useState("")
//      const [password,setPassword] = useState("")
//      const [showPassword,setshowPassword] = useState(false)

//      async function handleSignUp(){
//         if(!name || !email || !password){
//             alert("Please fill all the details")
//             return;
//         }
        
//             var formData = {
//                 userName : name,
//                 userEmail : email,
//                 userPassword : password
//             };

//             try{
//                var response = await fetch("https://6982dfa79c3efeb892a386b2.mockapi.io/data/users",
//                 {
//                 method: "POST",
//                 headers:{
//                     "Content-Type" : "application/json"
//                 },
//                 body:JSON.stringify(formData)
//                });


//             if(response.ok){
//                 alert("Account is created succesffully")
//                 setName("")
//                 setEmail("")
//                 setPassword("")
//             }
//             else{
//                 alert("failed to create the account")
//             }

//         } catch(error){
//             console.log(error);
//             alert("Something went wrong")
//         }
//      }


//     return(
        // <div id='main'>
        //     <h1>I am the signup page</h1>
        //     <label htmlFor=''>Enter Username</label>
        //     <input type='text'></input><br></br>
        //     <label htmlFor=''>Enter Email id</label>
        //     <input type='email'></input><br></br>
        //     <label htmlFor=''>Enter Password</label>
        //     <input type='password'></input><br></br>
        //     <label htmlFor=''>Enter Confirm Password</label>
        //     <input type='password'></input><br></br>
        //     <button>SignUp</button>
        // </div>  
//         <div id="signUp-container">
//             <div id="signUp-box">
//                 <h2>Create Account</h2>

//                 <label htmlFor=''>Enter Name</label>
//                 <input type='text' value={name} onChange={(e)=>setName(e.target.value)} required></input>
//                 <br></br>
//                 <br></br>
//                 <label htmlFor=''>Enter Email</label>
//                 <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
//                 <br></br>
//                 <br></br>
//                 <label htmlFor=''>Enter Password</label>
//                 <div className='password-field'>
//                     <input type={showPassword ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)}></input>
//                     <span onClick={()=>setshowPassword(!showPassword)}>{showPassword?<FaSlash /> : <FaEye/>}
//                     </span>

//                 </div>
//                 <br></br>
//                 <br></br>
//                 <button onClick={handleSignUp}>SignUp</button>
//             </div>
//         </div>
//     )
// }
export default SignUp;