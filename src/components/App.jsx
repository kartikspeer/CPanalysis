import React,{useState} from "react";
import Header from "./Header";
import Login from "./Login";
import MainArea from "./MainArea";
import Footer from "./Footer";

function App() {
  const [username,setusername] = useState("");
  const [loginStatus,setloginStatus] = useState(false);

  // console.log(username,loginStatus);
  return (
    <div>
      <Header loginStatus={loginStatus} setloginStatus={setloginStatus}/>
      {(!(loginStatus) && (<Login setusername={setusername} setloginStatus={setloginStatus} ></Login>))}
      {(loginStatus) && (<MainArea loginStatus={loginStatus} username={username} />)}
      <Footer />
    </div>
  );
}

export default App;
