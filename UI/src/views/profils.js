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
  Container,
  Col
} from "reactstrap";

// reactstrap components

export default function Profil() {
    useEffect=() =>{
        redirect()
          }

        
          const redirect=async(e)=>{
            const res=await fetch('http://localhost:5000/openprof');
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
   <div>

    <h1 style={{marginTop:'80px'}}>ESPACE PROFIL</h1>
    <h2>Spécifier precisemment votre choix:</h2>

    <Button className="btn-round" color="primary" type="button" onClick={(e)=>{navigatetoprof(e)}}>
            Profils des Profs
            </Button>
            <Button className="btn-round" color="primary" type="button" onClick={navigatetoetudiant}>
profils des étudiants
                         </Button>
           
   </div>
  );
}
