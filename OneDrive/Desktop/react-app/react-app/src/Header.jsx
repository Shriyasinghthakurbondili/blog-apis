// import React from "react";
// function Header(){
//     return(
//         <div id='div1'>
//             <h1>This is my heading</h1>
//         </div>
//     )
// }
// export default Header;

import React from "react";
const Header = () => {
    console.log("I am in the header")
    return(
        <div>
            Header
        </div>
    )
}
export default React.memo(Header)