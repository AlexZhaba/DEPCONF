import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Route, Switch, Redirect} from 'react-router-dom';

import md5 from 'md5';

import {CircularProgress } from '@material-ui/core';

let URL = "https://07555c6c7486.ngrok.io";

let CustomInput = (props) => {
  let [active, setActive] = useState(false);
  return (
    <div className="input__wrapper">
      <div className='input__title__container' style={active ? {color: "#ad5050", transition: ".2s all"} : {transition: ".2s all"}}>{props.title}</div>
      <input className='reg__input' onFocus={() => setActive(true)} onBlur={() => setActive(false)} value={props.value} onChange={(event) => props.change(event.target.value) }
          type={props.title === "password" || props.title === "confirm password" ? "password" : "text"}
          placeholder={""}/>
          {props.title === "email" && <div className="input__subtitle">
            {props.freeEmailStatus === "ERR" && <span>Долбаеб введи нормально</span>}
            {props.freeEmailStatus === "NO" && <span>Такой пидар уже есть</span>}
            {props.freeEmailStatus === "LOAD" && <CircularProgress size={20}/>}
            {props.freeEmailStatus === "OK" && <span style={{color: "#4fb065"}}>Такой пидарской почты ни у кого нет</span>}
          </div> }
          {props.title === "username" && <div className="input__subtitle">
            {props.freeNameStatus === "NO" && <span>Корешей жопоёбов нам не надо</span>}
            {props.freeNameStatus === "LOAD" && <CircularProgress size={20}/>}
            {props.freeNameStatus === "OK" && <span style={{color: "#4fb065"}}>Ты у нас уникальный пидрила</span>}
          </div> }
    </div>
  );
}

let validateEmail = (email) => {
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
}

let SignUp = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [fullName, setFullName] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confPassword, setConfPassword] = useState("")
  let [freeEmailStatus, setFreeEmailStatus] = useState(null);
  let [freeNameStatus, setFreeNameStatus] = useState(null);
  let [equalPassword, setEqualPassword] = useState(null);
  // null - пользователь ничего не вводил или в поле пусто
  // "LOAD" - получение инфы 
  // "OK"   - почта свободна 
  // "NO"  - почта не свободна
  // "ERR"  - почта не корректно введена
  // let []
  // window.emailTime;
  
  useEffect(() => {
    if (email === "") {
      setFreeEmailStatus(null);
      clearTimeout(window.emailTime);
    } else {
      clearTimeout(window.emailTime);
      window.emailTime = setTimeout(() => {
        setFreeEmailStatus("LOAD")
        if (!validateEmail(email)) {
          setFreeEmailStatus("ERR");
          // alert('иди нахуй добаеб')
        } else {
          axios.post(`${URL}/isfreemail`, JSON.stringify({
            mail: email
          })).then(response => {
              setFreeEmailStatus(response.status === 200 ? "OK" : "NO");
              console.log('response = ', response)
            }).catch(e => {
              setFreeEmailStatus("NO");
            });
        }
      }, 1000)
    }
  }, [email])
  useEffect(() => {
    if (username === "") {
      setFreeNameStatus(null);
      clearTimeout(window.nameTime);
    } else {
      clearTimeout(window.nameTime);
      window.nameTime = setTimeout(() => {
        setFreeNameStatus("LOAD");
        axios.post(`${URL}/isfreeuname`, JSON.stringify({
          username: username
        })).then(response => {
          setFreeNameStatus("OK")
        }).catch(e => {
          setFreeNameStatus("NO")
        })
      }, 1000)
    }
  }, [username]) 
  useEffect(() => {
    switch (freeEmailStatus) {
      case "ERR":
        
        break;

      default:
        break;
    }
  }, [freeEmailStatus])
  let sendSignUpData = () => {
    setIsLoading(true);
    axios({
      url: `${URL}/signup`,
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
      <CustomInput title="username" value={username} change={setUsername} freeNameStatus={freeNameStatus}/>
      <CustomInput title="email" value={email} change={setEmail} freeEmailStatus={freeEmailStatus}/>
      <CustomInput title="password" value={password} change={setPassword}/>
      <CustomInput title="confirm password" value={confPassword} change={setConfPassword} password={password}/>
      <div className="button__container" onClick={() => sendSignUpData()}>
        <span style={isLoading ? {display: "none"} : {}}>Sign up</span>
        <div className="loader__wrapper" style={!isLoading ? {display: "none"} : {}}>
          <CircularProgress color='primary' size={25}/>
        </div>
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
      url: `${URL}.io/signup`,
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
      {/* <div className="shadow__loading" style={!isLoading ? {display: "none"} : {}}>
        <CircularProgress color='primary'/>
      </div> */}
      <div className="button__container" onClick={() => sendSignInData()}>
      <span style={isLoading ? {display: "none"} : {}}>Sign in</span>
        <div className="loader__wrapper" style={!isLoading ? {display: "none"} : {}}>
          <CircularProgress color='primary' size={25}/>
        </div>
      </div>
    </div>
  )
}

let Handler = (props) => {
  console.log('props = ', props)
  return (
    <Redirect to="/sign"></Redirect>
  )
}

let App = () => {
  let [activePage, setActivePage] = useState(1); // 1 - SIGN_UP | 2 - SIGN_IN
  return (
    <div id="wrapper">
      <Switch>
        <Route
          path = '/sign'
          render = {() => <div className='main__container'>
          <div className='reg__container'>
            <div className='swap__container'>
              <div className="swap__element" onClick={() => setActivePage(1)} style={activePage === 1 ? {color: "#c96f6f"} : {}}>
                SIGN UP
              </div>
              <div className="swap__element"onClick={() => setActivePage(2)} style={activePage === 2? {color: "#c96f6f"} : {}}>
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
      </div>}
        />
        <Route
          path="/"
          render={(props) => <Handler {...props}/>}
        />
      </Switch>
    </div>
  );
}

export default App;
