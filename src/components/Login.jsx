import React,{useState} from "react";

function Login(props){
    const [userId,setuserId] = useState("");
    const [isLogedIn, setisLogedIn] = useState(false);

    function handleUsername(event){
        const newValue = event.target.value;
        props.setusername(newValue);
        setuserId(newValue);
    }

    function handleLogin(event){
        if(userId === ""){
            alert("Invalid Username")
        }
        else{
            setisLogedIn(!isLogedIn);
            props.setloginStatus(!isLogedIn);
            event.preventDefault();
        }
    }
    return (
        <div className="Login">
            <form>
                <div className="IntroContainer">
                    <h1>Hello!</h1>
                    <h2>Welcome To CPanalyser.</h2>
                    <p>Analyse your CodeForces profile</p>
                    <p>by entering your UserName below.</p>
                </div>
                <div className="Container">
                    <label><b>Username</b></label>
                    <input 
                        disabled={isLogedIn}
                        onChange={handleUsername}
                        type="text" 
                        name="handle" 
                        placeholder="Enter Username"
                        value = {userId}
                    />
                </div>
                <div className="Container">
                    <button 
                        onClick={handleLogin}
                        type="submit"
                    >{isLogedIn?"Log out":"Log in"}</button>
                </div>
            </form>
        </div>
    );
}

export default Login;

