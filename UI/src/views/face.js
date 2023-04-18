import { Routes , Route , useNavigate  } from "react-router-dom";
import React from "react";
import { useState , useEffect, useRef , Component ,useContext}  from "react";
import { USER_TYPES, use } from "../constants";



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
import Webcam from 'react-webcam';


// reactstrap components

export default function Face () {
  const [token, settoken] = useState(false);

  const [user, setUser] = useState(USER_TYPES.UNKNOWN);
  const { value, setValue } = useContext(use);
  const navigate = useNavigate();


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
      if (!token)
      {handleSpeechRecognition();}
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
          console.log(response);
          if (response.ok) {
            response.json().then((data) => {
              const [state, name] = data;
              console.log(state, name);
              setName(name)
              setlogged_in(true)
              switch (state) {
                case "PROF":
                  setUser(USER_TYPES.PROF);
                  setValue(USER_TYPES.PROF);
                  break;
                case "STUDENT":
                  setUser(USER_TYPES.STUDENT);
                  setValue(USER_TYPES.STUDENT);
                  break;
                case "PUBLIC":
                  setUser(USER_TYPES.PUBLIC);
                  setValue(USER_TYPES.PUBLIC);
                  break;
                default:
                  break;
              }
              if (state !== "PUBLIC") {
                setTimeout(() => {
                  navigatetoprof(true);
                }, 5000);
              }
            });
          } else {
            console.log("Login failed.");
          }
        })
        .catch(error => {
          console.error(error);
        });
      }        
        
        
        
        
             /*      setName(response.statusText)
        setlogged_in(true)
        switch (data.state) {
          case "PROF":
            setUser(USER_TYPES.PROF);
            setValue(USER_TYPES.PROF);
            break;
          case "STUDENT":
            setUser(USER_TYPES.STUDENT);
            setValue(USER_TYPES.STUDENT);
            break;
          case "PUBLIC":
            setUser(USER_TYPES.PUBLIC);
            setValue(USER_TYPES.PUBLIC);
            break;
          default:
            break;
        }
         */
       /*  if (response!== (null || "You are unknown")){
        setTimeout((i) => {
         navigatetoprof(true);
       }, 5000);
      }
      })
        
     
      .catch(error => {
        console.error(error);
      }) ;
  
  }*/
useEffect(() => {
    if (name!== (null || "You are unknown")){
 const timerId = setInterval(() => {
   setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
 }, 1000);

 return () => clearInterval(timerId);}
}, [name]);

const [timeLeft, setTimeLeft] = useState(8);



useEffect(() => {
   capture()
   handleSpeechRecognition()
  }, [message]);
 
    return (
      <div className="page-header header-filter">
        <div className="wrapper">
      <div className="page-header">
      <div className="content-center">
  
        <Container>
          <div className="content-center brand" ></div>
        <>
            {logged_in === false ?
            <>
           
            <div className="form-group">
                
                    <div>
                    <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
                    </div>
           
                </div>
            </>
            :
            <div>
               {name != (null || "You are unknown") ?
            <>
                <div className="details">
                    <h1>Hello {name} !</h1>
                    <br />
                    <h1>You are successfully logged in to the system.
                    you wil be redirected after :{logged_in && <p>{timeLeft}</p>} 
              </h1>
       
                    <div className="form-group">
                    </div>  
                </div>
                </>
            :
            <div>
              <p>"unknown"</p>
            </div>}
            </div>
            
            }  </>
            
        </Container>
      </div>
      </div>
      </div>
      </div>
       
       
    )
  }
  
  


