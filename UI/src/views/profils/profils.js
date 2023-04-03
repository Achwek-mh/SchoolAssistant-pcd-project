import { Routes , Route , useNavigate } from "react-router-dom";
import { useState ,useEffect } from "react";

import React from "react";
import {
  Button,
  Label,
  FormGroup,
  CustomInput,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  ButtonGroup,
  Container,
  Col
} from "reactstrap";

// reactstrap components

export default function Profil() {
    useEffect=() =>{
        redirect()
          }

        
          const redirect=async(e)=>{
            const res=await fetch('http://localhost:5000/openprofil');
            const data = await res.json();
           
        
          };
  const navigate = useNavigate();
  const navigatetoprof=()=>{
    navigate('/prof')
  }
  const navigatetoetudiant=()=>{
    navigate('/etudiant')
  }
 
  return (
    <div className="wrapper">
    <div className="page-header">
    <div className="content-center">

      <Container>
        <div className="content-center brand">

    <h1  style={{float:'center'}}>ESPACE PROFIL</h1>
    <h2>Spécifier precisemment votre choix:</h2>
    <Button className="btn-round mx-2 bold" color="primary" type="button" onClick={navigatetoprof}>
            Profils des Profs
            </Button>
            <Button className="btn-round  bold" color="primary" type="button" onClick={navigatetoetudiant}>
profils des étudiants
                         </Button>

                         </div>
      </Container>
    </div>
    </div>
    </div>
  );
}
