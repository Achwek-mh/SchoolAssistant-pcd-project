import { Routes , Route , useNavigate } from "react-router-dom";
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

export default function Result() {


  const navigate = useNavigate();
  const navigatetoPCD=()=>{
    navigate('/PCD')
  }
  const navigatetoPFE=()=>{
    navigate('/PFE')
  }
  const navigatetoPE=()=>{
    navigate('/PE')
  };
  return (
   <div>
    
    <p style={{marginTop:'80px'}}>RESULTAT</p>
    </div>
  );
}
