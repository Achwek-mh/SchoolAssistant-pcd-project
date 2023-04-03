import { Routes , Route , useNavigate } from "react-router-dom";
import { useState ,useEffect } from "react";

import React from "react";
import {
  Button,
  Label,
Form,
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
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
// reactstrap components

export default function Prof() {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('')
  
    const handleQuestionChange = (event) => {
      setQuestion(event.target.value);
    };
 /*    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
        })
          .then((response) => response.json())
          .then((data) => {
            setAnswer(data.answer);
          })
          .catch((error) => console.error(error));
      }; */
   
      const [message, setMessage] = useState("");

      const handleSpeechRecognition = (e) => {
        e.preventDefault()
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "fr-FR";
    
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          console.log(transcript);
          setMessage(transcript);
        };
    
        recognition.start();
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault()

        // Send the message to your Flask backend
        const response = await fetch("http://localhost:5000/answerprof", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });
      
        const data = await response.json();
        console.log(data);
        setAnswer(data.answer)
      
      }
    
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
    <h1 style={{marginTop:'380px'}}>ESPACE PROF</h1>
    <h2>S'informer à propos des étudiants:</h2>
    <div>
    <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
       
     
      <Input
          type="text"
          value={answer}
        />  
         <Button type="submit">Send</Button>
        <Button onClick={(e)=>handleSpeechRecognition(e)}>Speak</Button>  
        </Form>
   
    </div>
             
   </div>
      </Container>
    </div>
  );
}
