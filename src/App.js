import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
let CustomInput = ({title, value, change}) => {
  let [active, setActive] = useState(false);
  return (
    <div className="input__wrapper">
      <div className='input__title__container' style={active ? {color: "#e3d15b", transition: ".2s all"} : {transition: ".2s all"}}>{title}</div>
      <input className='reg__input' onFocus={() => setActive(true)} onBlur={() => setActive(false)} value={value} onChange={(event) => change(event.target.value) }
          type={title === "password" || title === "confirm password" ? "password" : "text"}
          placeholder={''}/>
    </div>
  );
}

let validateEmail = (email) => {
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
}

let SignUp = () => {
  let [fullName, setFullName] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confPassword, setConfPassword] = useState("")
  
  let sendSignInData = () => {
    axios({
      url: "https://60be0604f848.ngrok.io/signup",
      method: "post",
      headers: {
        // "Access-Control-Allow-Origin" : "https://afc210a26eaa.ngrok.io",
        // "Access-Control-Allow-Origin" : "*",
        // "Access-Control-Allow-Credentials": "true",
      },
      data: JSON.stringify({
        fullName: fullName,
        username: username, 
        email: email, 
        password: password,
      })
    }).then(response => {
      alert('nice');
    }).catch(e => {
      
    })
  }
  return (
    <div className='signup__container'>
      <CustomInput title="full name" value={fullName} change={setFullName}/>
      <CustomInput title="username" value={username} change={setUsername}/>
      <CustomInput title="email" value={email} change={setEmail}/>
      <CustomInput title="password" value={password} change={setPassword}/>
      <CustomInput title="confirm password" value={confPassword} change={setConfPassword}/>
      <div className="button__container" onClick={() => sendSignInData()}>
        AcceptMyFuckingGoodness
      </div>
    </div>
  );
}

let SignIn = () => {
  return (
    <div className='signup__container'>
      <CustomInput title="username"/>
      <CustomInput title="password"/>
    </div>
  )
}

let App = () => {
  let [activePage, setActivePage] = useState(1); // 1 - SIGN_UP | 2 - SIGN_IN
  return (
    <div id="wrapper">
      <div className='main__container'>
          <div className='reg__container'>
            <div className='swap__container'>
              
            </div>
            <div style={{width: "100%"}}>
              {
                activePage === 1 && <SignUp/>
              }
              {
                activePage === 2 && <SignIn/>
              }
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
