import { Routes , Route , useNavigate } from "react-router-dom";
import React from "react";
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

export default function Event() {


  const navigate = useNavigate();
  const navigatetoPCD=()=>{
    navigate('/PCD')
  }
  const navigatetoPFE=()=>{
    navigate('/PFE')
  }
  const navigatetoPE=()=>{
    navigate('/PE')
  }
  return (
   <div>
    
    <p style={{marginTop:'80px'}}>hello</p>
    </div>
  );
}
