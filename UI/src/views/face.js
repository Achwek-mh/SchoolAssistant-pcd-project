import { Routes , Route , useNavigate } from "react-router-dom";
import axios from "axios";
import Webcam from 'react-webcam';
import React, { useState, useEffect, useRef,useCallback } from "react";
import {
  Button,
  Label,
  Form,
  CustomInput,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
export default function Face ()  {
  const handleSpeechRecognition =() => {
    
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "fr-FR";

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setMessage(finalTranscript);
      console.log(finalTranscript)
          settoken(true)

    };

    recognition.onerror = (event) => {
      console.error(event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      handleSpeechRecognition();
    };

    recognition.start();
  };
  const navigatetoprof=()=>{
  navigate('/')
}
    const webcamRef = useRef(null);
    const [name, setName] = useState(null);
    const [message, setMessage] = useState("");

    const [logged_in, setlogged_in] = useState(false);
    const [token, settoken] = useState(false);

    const navigate = useNavigate();
    const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      console.log("dfgf")
      return;
    }
    const formData = new FormData();
    formData.append('image', imageSrc);
   if(message==='identifier moi')
      fetch('http://localhost:5000/login', {
        method: 'POST',
     
        body:
          formData        
      })
        .then((response) =>{ 
          console.log(response)
          setName(response.statusText)
        setlogged_in(true)
        if (response!== (null || "You are unknown")){
        setTimeout((i) => {
         navigatetoprof(true);
       }, 5000);
      }
      })
        
     
      .catch(error => {
        console.error(error);
      });
  
  }
useEffect(() => {
    if (name!== (null || "You are unknown")){
 const timerId = setInterval(() => {
   setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
 }, 1000);

 return () => clearInterval(timerId);}
}, []);

const [timeLeft, setTimeLeft] = useState(8);



useEffect(() => {
   capture()
   handleSpeechRecognition()
  }, [message]);
 
    const formData = new FormData();
    formData.append('image', 'hello');
    const sub =  {
  

      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    }
    const subb =async(e)=>{
      e.preventDefault()
    await fetch('http://localhost:5000/reg', sub)} 
   
  return (
    <div className="page-header header-filter">
    <div className="wrapper">
  <div className="page-header">
  <div className="content-center">

    
      <div className="content-center brand" ></div>
      <Form  onSubmit= {(e)=>{subb(e)}} >
        
         <Button type="submit">Send</Button>
        </Form>

    
        
 
  </div>
  </div>
  </div>
  </div>
   
   
)

 
  }



