import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { USER_TYPES, use } from "../constants";

import {
  Button,
  Container,
} from "reactstrap";
import { useState, useEffect } from "react";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

export default function Général() {
  const redirect = async (e) => {
    const res = await fetch("http://localhost:5000/open_website");
    const data = await res.json();
    console.log(data)

    window.location.replace(data.message)
    };
    

  useEffect(() => {
    redirect();
  }, []);

  const [user, setUser] = useState(USER_TYPES.UNKNOWN);
  const { value, setValue } = useContext(use);
 
  const newUser = async (e) => {
    const res = await fetch("http://localhost:5001/get_state");
    const data = await res.json();
    console.log(data)
    switch (data.state) {
      case "PROF":
        setUser(USER_TYPES.PROF);
        setValue(USER_TYPES.PROF);
        break;
      case "STUDENT":
        setUser(USER_TYPES.STUDENT);
        setValue(USER_TYPES.STUDENT);
        break;
      case "PUBLIC":
        setUser(USER_TYPES.PUBLIC);
        setValue(USER_TYPES.PUBLIC);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    newUser();
    console.log(value)
    console.log(user)

  }, []); 

  const navigate = useNavigate();
  const navigatetoprofil = (e) => {
    e.preventDefault();
    navigate("/profil");
  };
  const navigatetosujet = () => {
    navigate("/sujet");
  };
  const navigatetoresult = () => {
    navigate("/result");
  };
 
  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">Ensi smart Assistant</h1>
          
          <Button className="btn-round" color="primary" type="button" onClick={(e)=>{navigatetoprofil(e)}}>
            Espace profils
            </Button>
            <Button className="btn-round" color="primary" type="button" onClick={(e)=>{navigatetosujet(e)}}>
Espace sujet
                         </Button>
                         <Button className="btn-round" color="primary" type="button" onClick={(e)=>{navigatetoresult(e)}}>
Espace resultat                         </Button>
<Button className="btn-round" color="primary" type="button" /* onClick={(e)=>{navigatetoprofil(e)}} */>
            Espace events
            </Button>
            <Button className="btn-round" color="primary" type="button" /* onClick={(e)=>{navigatetosujet(e)}} */>
Espace emploi
                         </Button>
                         <Button className="btn-round" color="primary" type="button" /* onClick={(e)=>{navigatetoresult(e)}} */>
Espace resultat                         </Button>
<Button className="btn-round" color="primary" type="button" >User type: {user}</Button>
          <Button className="btn-round" color="primary" type="button" >User context: {value}</Button>
        </div>
      </Container>
    </div>
  );
}
