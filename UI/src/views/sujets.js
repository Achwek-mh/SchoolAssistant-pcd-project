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
import "../assets/css/nucleo-icons.css";
import "../assets/scss/blk-design-system-react.scss";
import "../assets/demo/demo.css";
// reactstrap components

export default function Sujet() {


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
    <div className="wrapper">
    <div className="page-header">
    <div className="content-center">

      <Container>
        <div className="content-center brand">
        <h1 style={{marginTop:'80px'}} >SUJET</h1>
          <h3 className="d-none d-sm-block">
         
          </h3>
          <Button className="btn-round" color="primary" type="button"  onClick={{navigatetoPCD}}>
PCD 
            </Button>
          <Button className="btn-round" color="primary" type="button" onClick={navigatetoPFE}>
PFE         
    </Button>
            <Button className="btn-round" color="primary" type="button" onClick={navigatetoPE}>
PE
                          </Button>

        </div>
      </Container>
    </div>
    </div>
    </div>
  );
}
