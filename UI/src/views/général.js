import { Routes , Route , useNavigate } from "react-router-dom";
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
  Row,
  Col
} from "reactstrap";

// reactstrap components

export default function General() {


  const navigate = useNavigate();
  const navigatetoPCD=()=>{
    navigate('/PCD')
  };
  const navigatetoPFE=()=>{
    navigate('/PFE')
  }
  const navigatetoPE=()=>{
    navigate('/PE')
  }
  return (
   <div>


<h1 className="h1-seo">GENERAL</h1>
          <h3 className="d-none d-sm-block">
            How can I help you ?           <h5>Please choose from the list above </h5> 

          </h3>
   </div>
  );
}
