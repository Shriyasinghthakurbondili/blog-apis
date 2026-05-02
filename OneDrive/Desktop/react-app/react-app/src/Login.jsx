// import React from 'react'
// import './SignUp.css'
// // function Login()
// import { useState } from 'react';
// const Login= () => {
//     const[username,setUsername] = useState("")
//     const[password,setPassword] = useState("")
//     const[responseData, setResponseData] = useState(null)

//     async function handleLogin(){
//         try{
//             const response = await fetch('https://dummyjson.com/user/login', {
//                 method:"POST",
//                 headers:{
//                     "Content-Type" : "application/json",
//                 },
//                 body:JSON.stringify({
//                    username:username.trim(),
//                    password:password.trim(),
//                    expiresInMins: 30,
//                 }),
    
//         });

//         const data = await response.json();
//         console.log(data)
//         setResponseData(data)
//         console.log(data)
//         }catch(error){
//             console.log("Login Error:",error)
//         }
//     }
//     return(
//         // <div id='main'>
//         //     <h1>I am the Login Page</h1>
//         //     <label htmlFor=''>Enter the Email id</label>
//         //     <input type='email'></input>
//         //     <label htmlFor=''>Enter the password</label>
//         //     <input type='password'></input>
//         //     <button>Login</button>
//         // </div>
//         <div style={{width:"300px", margin:"50px auto"}}>
//             <h2>Login</h2>
//             <input type='text' placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
//             <br></br>
//             <input type='password' placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
//             <br></br>
//              <button onClick={handleLogin}>Login</button>

//       {responseData && (
//         <pre>{JSON.stringify(responseData, null, 2)}</pre>
//       )}
//     </div>
//   );
// };

// export default Login

// import React, { useState } from 'react' 
// import { Toaster, toast } from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// const Login = () =>{
//     var[userEmail,setUserEmail] = useState("johndoe@example.com")
//     var[userpassword,setUserPassword] = useState("Password123!")
//     var navigate = useNavigate()
//     var users = [
//         {email: "johndoe@example.com", password:"Password123!"},
//         {email:"morrison@example.com", password:"Password123!"},
//         {email:"kevin@example.com", password:"Password123!"},
//         {email:"don@example.com", password:"Password123!"},
//         {email:"david_r@example.com", password:"Password123!"},
//         {email:"derek@example.com", password:"Password123!"},
//         {email:"david_r@example.com", password:"Password123!"},
//         {email:"miriam@example.com", password:"Password123!"},
//         {email:"william@example.com", password:"Password123!"},
//         {email:"kate@example.com", password:"Password123!"},
//         {email:"jimmie@example.com", password:"Password123!"}

//     ]
//     function HandleForm(){
//         var userExists = users.find(item=> userEmail == item.email && userpassword == item.password)
//         if(userExists){
//             toast.success("Login success")
//             setUserEmail("")
//             setUserPassword("")
//             setTimeout(()=>{
//                 navigate("/home")
//             },1000);
//             }else{
//                 toast.error("Failed to Login")
//             }
//         }
//         return(
//             <div>
//                 <Toaster>
//                     <label htmlFor=''>Enter User Email</label>
//                     <input value={userEmail} type='email' onChange={(e)=>{setUserEmail(e.target.value)}}></input>
//                     <label htmlFor=''>Enter User Password</label>
//                     <input value={userpassword} type="password" onChange={(e)=>{setUserPassword(e.target.value)}}></input>
//                     <button onClick={HandleForm}>Login</button>
//                 </Toaster>
//             </div>
//         )
//     }
// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // ✅ CORRECT
// import { Toaster, toast } from "react-hot-toast";
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import './Login.css';

// const Login = () => {

//   const [userEmail, setUserEmail] = useState("johndoe@example.com");
//   const [userPassword, setUserPassword] = useState("Password123!");
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const users = [
//     { email: "johndoe@example.com", password: "Password123!" },
//     { email: "janesmith@example.com", password: "Password123!" },
//     { email: "alexbrown@example.com", password: "Password123!" },
//     { email: "emilywhite@example.com", password: "Password123!" }
//   ];

//   function handleLogin() {

//     const userExists = users.find(
//       item => userEmail === item.email && userPassword === item.password
//     );

//     if (userExists) {

//       toast.success("Login Successful ✅");

//       // Clear fields
//       setUserEmail("");
//       setUserPassword("");

//       // Navigate
//       navigate("/home");

//     } else {

//       toast.error("Invalid Email or Password ❌");

//     }
//   }

//   return (
//     <div className="login-container">

//       <Toaster position="top-center"/>

//       <h2>Login</h2>

//       <label>Email</label>
//       <input
//         value={userEmail}
//         onChange={(e) => setUserEmail(e.target.value)}
//         type="email"
//       />

//       <label>Password</label>

//       <div className="password-input-container">
//         <input
//           value={userPassword}
//           onChange={(e) => setUserPassword(e.target.value)}
//           type={showPassword ? "text" : "password"}
//         />

//         <span
//           className="password-toggle-icon"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? <FaEyeSlash /> : <FaEye />}
//         </span>

//       </div>

//       <button onClick={handleLogin}>
//         Login
//       </button>

//     </div>
//   );
// };

// export default Login;
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// import {Toaster,toast} from "react-hot-toast"

// const Login = () => {
//   var [userEmail,setUserEmail] = useState("johndoe@example.com")
//   var [userpassword,setUserPassword] = useState("Password123!")
//   var navigate = useNavigate()
//   var users = [
//     { email: "johndoe@example.com", password: "Password123!" },
//     { email: "janesmith@example.com", password: "Password123!" },
//     { email: "alexbrown@example.com", password: "Password123!" },
//     { email: "emilywhite@example.com", password: "Password123!" },
//     { email: "michaellee@example.com", password: "Password123!" },
//     { email: "sarahwilson@example.com", password: "Password123!" },
//     { email: "davidclark@example.com", password: "Password123!" },
//     { email: "lauramoore@example.com", password: "Password123!" },
//     { email: "robertking@example.com", password: "Password123!" },
//     { email: "oliviamartin@example.com", password: "Password123!" }
    

//   ]

//   function handleLogin(){
//     var userExists = users.find(item=> userEmail == item.email && userpassword == item.password)
//     if(userExists){
//     toast.success("login sucess")
//       setUserEmail("")
//       setUserPassword("")
//       setTimeout(() => {
//         navigate("/home")
        
//       }, 1000);
//     }else{
//       toast.error("failed to login")
      
//     }
//   }
//   return (
//     <div>
//       <Toaster/>
//       <label htmlFor="">Enter User Email</label>
//       <input value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}} type="text" />
//       <label htmlFor="">Enter User Password</label>
//       <input value={userpassword} onChange={(e)=>{setUserPassword(e.target.value)}} type="text" />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   )
// }

// export default Login;

// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './Login.css';
// import {Toaster,toast} from "react-hot-toast"

// const Login = () => {
//   var [userEmail,setUserEmail] = useState("johndoe@example.com")
//   var [userpassword,setUserPassword] = useState("Password123!")
//   var navigate = useNavigate()
//   var users = [
//     { email: "johndoe@example.com", password: "Password123!" },
//     { email: "janesmith@example.com", password: "Password123!" },
//     { email: "alexbrown@example.com", password: "Password123!" },
//     { email: "emilywhite@example.com", password: "Password123!" },
//     { email: "michaellee@example.com", password: "Password123!" },
//     { email: "sarahwilson@example.com", password: "Password123!" },
//     { email: "davidclark@example.com", password: "Password123!" },
//     { email: "lauramoore@example.com", password: "Password123!" },
//     { email: "robertking@example.com", password: "Password123!" },
//     { email: "oliviamartin@example.com", password: "Password123!" }
    

//   ]

//   function handleLogin(){
//     var userExists = users.find(item=> userEmail == item.email && userpassword == item.password)
//     if(userExists){
//     toast.success("login sucess")
//       setUserEmail("")
//       setUserPassword("")
//       setTimeout(() => {
//         navigate("/home")
        
//       }, 1000);
//     }else{
//       toast.error("failed to login")
      
//     }
//   }
//   return (
//     <div>
//       <Toaster/>
//       <label htmlFor="">Enter User Email</label>
//       <input value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}} type="text" />
//       <label htmlFor="">Enter User Password</label>
//       <input value={userpassword} onChange={(e)=>{setUserPassword(e.target.value)}} type="text" />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   )
// }

// export default Login;