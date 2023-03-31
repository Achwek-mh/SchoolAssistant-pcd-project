import { Routes , Route , useNavigate } from "react-router-dom";
import { useState ,useEffect } from "react";

import React from "react";
import {
  Button,
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// reactstrap components

export default function Etudiant() {
    useEffect=() =>{
        redirect()
          }
          const redirect=async(e)=>{
            const res=await fetch('http://localhost:5000/open_profil');
            const data = await res.json();
           
        
          }
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

    <Button className="btn-round" color="primary" type="button" onClick={navigatetoprof}>
            Profils des Profs
            </Button>
            <Button className="btn-round" color="primary" type="button" onClick={navigatetoetudiant}>
profils des étudiants
                         </Button>
           
   </div>
  );
}
