// import React from 'react'
// function Home(){
//     return(
//         <div>
//             <h1>I am the Home page</h1>
//         </div>
//     )
// }
// export default Home;
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Home.css"
// function Home(){
//     var navigate = useNavigate()
//     function HandlePy(){
//         navigate("/python")
//     }

//     return(
//         <div id="main">
//             <button onClick={HandlePy}>Python</button>
//             <button onClick={()=>{navigate("/js")}}>Javascript</button>
//             <button>React</button>
//             <button>Angular</button>
//             <button>Express</button>
//             <button>MongoDB</button>
//             <button>Node js</button>
//         </div>
//     )
// }

// export default Home;

// import React from "react";
// const Home = (props) =>{
//     console.log(props)
//     return(
//         <div>
//             <h1>{props.name}</h1>
//         </div>
//     )
// }

// export default Home;

// import React, { useEffect, useState } from "react";
// const Home = () => {
//     var [data, setData] = useState([]) 
//     async function fetchData(){
//     var result = await fetch("https://fakestoreapi.com/products")
//     var jsonResult = await result.json()
//     setData(jsonResult)
//     }
//     console.log(data);
//     useEffect(()=>{
//         fetchData()
//     }, [])
//     return(
//         <div>
//            {
//             data.map((item)=>{
//                 return(
//                     <div>
//                         <h1>{item.title}</h1>
//                         <img src={item.image} alt=""></img>
//                     </div>
//                 )
//             })
//            }
//         </div>
//     )
// }

// export default Home;

// import React from "react";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// const App = () =>{
    
//     // App container style
//     const appStyle = {
//         minheight : "100vh",
//         background : "linear-gradient(135deg,#667eea,#764ba2)",
//         display : "flex",
//         justifyContent : "center",
//         alignItems:"center"
//     }

//     // Loader style 
//     const loaderStyle = {
//         minheight : "100vh",
//         background : "linear-gradient(135deg,#667eea,#764ba2)",
//         display : "flex",
//         justifyContent : "center",
//         alignItems:"center"
//     }

//     return(
//         <div style={appStyle}>
//             <Suspense fallback={
//                 <div style={loaderStyle}>
//                   <AiOutlineLoading3Quarters></AiOutlineLoading3Quarters>  
//                 </div>
//             }>
//                 <Home></Home>
//             </Suspense>
//         </div>
//     )
// }
// export default Home; 

// import React, { useEffect, useState } from 'react'

// const Home = () => {
//     var [data,setData] = useState([])
//     async function fetchData(){
//         var result = await fetch("https://fakestoreapi.com/products")
//         var jsonResult = await result.json()
//         setData(jsonResult)
//     }
//     console.log(data);
//     useEffect(()=>{
//         fetchData()
//     },[])
//   return (
//     <div>
//         {
//             data.map((item)=>{
//                 return(
//                     <div>
//                         <h1>{item.title}</h1>
//                         <img src={item.image} alt="" />
//                     </div>
//                 )
//             })
//         }

//     </div>
//   )
// }

// export default Home;

import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to={"/about"}>about</Link>

    </div>
  )
}

export default Home;