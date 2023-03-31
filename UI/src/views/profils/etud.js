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
        const response = await fetch("http://localhost:5000/answeretud", {
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
   <div>

    <h1 style={{marginTop:'80px'}}>ESPace Etudiant</h1>
    <h2>Spécifier precisemment votre choix:</h2>
    <div>
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
        <button onClick={(e)=>handleSpeechRecognition(e)}>Speak</button>
      </form>
      <p>Answer: {answer}</p>
    </div>
             
   </div>
  );
}
