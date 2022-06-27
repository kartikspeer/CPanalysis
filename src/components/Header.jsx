import React from "react";

function Header(props){
    return (
        <header>
            <img src={require("./code-forces.png")} className="image" alt=""/>
            <h1>CPanalyser</h1>
            {(props.loginStatus) && <button className="logOutBtn" onClick={()=>{
                props.setloginStatus(false)
            }}>Log out</button>}
        </header>
    )
}

export default Header;