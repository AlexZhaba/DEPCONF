import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import md5 from 'md5';

import {CircularProgress } from '@material-ui/core';


let CustomInput = ({title, value, change}) => {
  let [active, setActive] = useState(false);
  return (
    <div className="input__wrapper">
      <div className='input__title__container' style={active ? {color: "#ad5050", transition: ".2s all"} : {transition: ".2s all"}}>{title}</div>
      <input className='reg__input' onFocus={() => setActive(true)} onBlur={() => setActive(false)} value={value} onChange={(event) => change(event.target.value) }
          type={title === "password" || title === "confirm password" ? "password" : "text"}
          placeholder={""}/>
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
  let [freeEmailStatus, setFreeEmailStatus] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  // let []
  // window.emailTime;
  useEffect(() => {
    if (email === "") {
      setFreeEmailStatus(null);
      clearTimeout(window.emailTime);
    } else {
      clearTimeout(window.emailTime);
      window.emailTime = setTimeout(() => {
        alert("LOADING")
      }, 1000)
    }
  }, [email])
  // null - пользователь ничего не вводил или в поле пусто
  // "LOAD" - получение инфы 
  // "OK"   - почта свободна 
  // "ERR"  - почта не свободна
  let sendSignUpData = () => {
    setIsLoading(true);
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
        password: md5(password),
      })
    }).then(response => {
      setIsLoading(false);
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
      <div className="shadow__loading" style={!isLoading ? {display: "none"} : {}}>
        <CircularProgress color='primary'/>
      </div>
      <div className="button__container" onClick={() => sendSignUpData()}>
        Sign up
      </div>
    </div>
  );
}

let SignIn = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let sendSignInData = () => {
    setIsLoading(true);
    axios({
      url: "https://60be0604f848.ngrok.io/signup",
      method: "post",
      headers: {
        // "Access-Control-Allow-Origin" : "https://afc210a26eaa.ngrok.io",
        // "Access-Control-Allow-Origin" : "*",
        // "Access-Control-Allow-Credentials": "true",
      },
      data: JSON.stringify({
        username: username,
        password: md5(password),
      })
    }).then(response => {
      setIsLoading(false);
      alert('nice');
    }).catch(e => {
      
    })
  }
  return (
    <div className='signup__container'>
      <CustomInput title="username" value={username} change={setUsername}/>
      <CustomInput title="password" value={password} change={setPassword}/>
      <div className="shadow__loading" style={!isLoading ? {display: "none"} : {}}>
        <CircularProgress color='primary'/>
      </div>
      <div className="button__container" onClick={() => sendSignInData()}>
        Sign in
      </div>
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
              <div className="swap__element" onClick={() => setActivePage(1)} style={activePage === 1 ? {color: "#e3d15b"} : {}}>
                SIGN UP
              </div>
              <div className="swap__element"onClick={() => setActivePage(2)} style={activePage === 2? {color: "#e3d15b"} : {}}>
                SIGN IN
              </div>
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
