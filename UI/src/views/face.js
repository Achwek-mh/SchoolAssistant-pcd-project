import { Routes , Route , useNavigate } from "react-router-dom";
import React from "react";
import { useState , useEffect, useRef , Component }  from "react";

import axios from 'axios';

import {
  Button,
  Label,
  CustomInput,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// reactstrap components

export default function Face () {
    const [name, setName] = useState(null);
    const [logged_in, setlogged_in] = useState(false);

 

const navigate = useNavigate();
const navigatetoprof=()=>{
  navigate('/')
}
const login=()=>{
  fetch("http://127.0.0.1:5000/login")
  .then(res =>res.text())
  .then((res)=>{
      setName(res) ;
      setlogged_in(true)
      console.log(logged_in)
      console.log(res)

      if (res!= (null || "You are unknown")){
        setTimeout((i) => {
         navigatetoprof(true);
       }, 5000);
      }
    
  
  })
}
const [timeLeft, setTimeLeft] = useState(8);

useEffect(() => {
     if (name!= (null || "You are unknown")){
  const timerId = setInterval(() => {
    setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
  }, 1000);

  return () => clearInterval(timerId);}
}, []);




  return (
    <div className="page-header header-filter">
      <div className="wrapper">
    <div className="page-header">
    <div className="content-center">

      <Container>
        <div className="content-center brand" ></div>
      <>
          {logged_in == false ?
          <>
          <div className="form-group"  >
              <input type="submit" value="Authenticate Me" onClick={()=>{login()}} className="btn btn-primary" />
          </div>
          </>
          :
          <div>
             {name != (null || "You are unknown") ?
          <>
              <div className="details">
                  <h1>Hello {name} !</h1>
                  <br />
                  <h1>You are successfully logged in to the system.
                  you wil be redirected after :{logged_in && <p>{timeLeft}</p>} 
            </h1>
     
                  <div className="form-group">
{/*                       <input type="submit" value="Logout" onClick={()=>{this.setState({msg:null,logged_in:false})}} className="btn btn-primary" />
 */}                  </div>  
              </div>
              </>
          :
          <div>
            <p>"unknown"</p>
          </div>}
          </div>
          
          }  </>
          
      </Container>
    </div>
    </div>
    </div>
    </div>
     
     
  )
}
        