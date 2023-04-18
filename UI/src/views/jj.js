/* import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import React from "react";
import { Col } from "reactstrap";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

// reactstrap components

export default function Prof() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [message, setMessage] = useState("");

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSpeechRecognition = (e) => {
    e.preventDefault();
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

  const sub = async () => {
    const response = await fetch("http://localhost:5000/answerprof", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    setAnswer(data.answer);
  };

  useEffect(() => {
    
    sub();
  }, [message]);

  return (
    <div>
      <h1 style={{ marginTop: "80px" }}>ESPACE Professeur</h1>
      <h2>Spécifier precisemment votre choix:</h2>
      <div>
        <form>
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </form>
        <p>Answer: {answer}</p>
      </div>
    </div>
  );
} */
import { Routes , Route , useNavigate } from "react-router-dom";
import React from "react";
import { useState , useEffect, useRef , Component }  from "react";


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

export default function Face () {
    const [name, setName] = useState(null);
    const [logged_in, setlogged_in] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef(null);
 

  const navigate = useNavigate();
  const navigatetoprof=()=>{
    navigate('/')
  }
  const login=()=>{
  fetch("http://127.0.0.1:5000/login")
  .then(res =>res.text())
  .then((res)=>{
      setName(res) ;
      setlogged_in(true)
      console.log(logged_in)
      console.log(res)

      if (res!= (null || "You are unknown")){
        setTimeout((i) => {
         navigatetoprof(true);
       }, 5000);
      }
    
  
  })
}
const [timeLeft, setTimeLeft] = useState(8);

useEffect(() => {
     if (name!= (null || "You are unknown")){
  const timerId = setInterval(() => {
    setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
  }, 1000);

  return () => clearInterval(timerId);}
}, []);


function openCamera() {
  setShowCamera(true);
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    })
    .catch((err) => {
      console.error("Error opening camera: ", err);
    });
}

function closeCamera() {
  setShowCamera(false);
  if (videoRef.current) {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });
    videoRef.current.srcObject = null;
  }
}
function loginAndCloseCamera() {
  login();
  closeCamera();
}
  return (
    <div className="page-header header-filter">
      <div className="wrapper">
    <div className="page-header">
    <div className="content-center">

      <Container>
        <div className="content-center brand" ></div>
      <>
          {logged_in == false ?
          <>
          <div className="form-group"  >
              <input type="submit" value="Authenticate Me" onClick={()=>{loginAndCloseCamera()}} className="btn btn-primary" />
          </div>
          <div className="form-group">
                <button onClick={openCamera}>Open Camera</button>
                {showCamera && (
                  <div>
                    <video ref={videoRef} autoPlay />
                  </div>
                )}
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





import { useState, useEffect , useCallback,useRef} from "react";


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

export default function Face () {
  const [message, setMessage] = useState("");
  


/* 
  const handleSpeechRecognition =  useCallback(() => {
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
    };

    recognition.onerror = (event) => {
      console.error(event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      handleSpeechRecognition();
    };

    recognition.start();
  },[]); 
  /*    useEffect(() => {
      handleSpeechRecognition();
    }, []); */
    const [name, setName] = useState(null);
    const [imagePath, setimagePath] = useState('');

    const [logged_in, setlogged_in] = useState(false);

 

const navigate = useNavigate();
const navigatetoprof=()=>{
  navigate('/')
}
/* 
   fetch("http://127.0.0.1:5000/login")
  .then(res =>
    {console.log(res)
    setimagePath(res.statusText)
    console.log(imagePath)
    })
  .then((res)=>{
    
   
      setName(res) ;
      setlogged_in(true)
      console.log(logged_in)

      if (res!= (null || "You are unknown")){
        setTimeout((i) => {
         navigatetoprof(true);
       }, 5000);
      }
    
  
  }) */
/*   axios
  .get("http://127.0.0.1:5000/login")
  .then((res) => {
    console.log(res);
    setName(res.data[0]) ;
    
    setimagePath(res.data[1].image_url); })
    .then((res)=>{
      setlogged_in(true)
      console.log(logged_in)

      if (res!== (null || "You are unknown")){
        setTimeout((i) => {
         navigatetoprof(true);
       }, 5000);
      }
  })
  .catch((error) => {
    console.error(error);
  });
};
useEffect(() => {
  const timeoutId = setTimeout(login, 2000);
  return () => clearTimeout(timeoutId);
}, [login]);
const [timeLeft, setTimeLeft] = useState(8);
console.log(imagePath)
useEffect(() => {
     if (name!== (null || "You are unknown")){
  const timerId = setInterval(() => {
    setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
  }, 1000);

  return () => clearInterval(timerId);}
}, []);

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
          <div className="form-group"  >
              <input type="submit" value="Authenticate Me" onClick={()=>{login()}} className="btn btn-primary" />
          </div>
       
          </>
          :
          <div>
                          <img src={imagePath} alt="logo" />

             {name !== (null || "You are unknown") ?
          <>
              <div className="details">
                  <h1>Hello {name} !</h1>
                  <br />
                  
                  <h1>You are successfully logged in to the system.
                  you will be redirected after :{logged_in && <p>{timeLeft}</p>} 
            </h1>
                 </div>  
              </div>
              </>
          <>
          <div className="details">
              <h1>Hello {name} !</h1>
              <br />
              
              <h1>You are successfully logged in to the system.
              you will be redirected after :{logged_in && <p>{timeLeft}</p>} 
        </h1>
              <div className="form-group">
                 </div>  
          </div>
          </>
      :
      <div>
        <p>"unknown"</p>
      </div>
      }
      </div>
      
      }  </>
      
  </Container>
</div>
</div>
</div>
</div>
 
 
)
}*/
} 


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
  ButtonGroup,
  Container,
  Col
} from "reactstrap";

// reactstrap components

export default function Profil() {
    useEffect=() =>{
        redirect()
          }

        
          const redirect=async(e)=>{
            const res=await fetch('http://localhost:5000/openprofil');
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
    <div className="wrapper">
    <div className="page-header">
    <div className="content-center">

      <Container>
        <div className="content-center brand">

    <h1  style={{float:'center'}}>ESPACE PROFIL</h1>
    <h2>Spécifier precisemment votre choix:</h2>
    <Button className="btn-round mx-2 bold" color="primary" type="button" onClick={navigatetoprof}>
            Profils des Profs
            </Button>
            <Button className="btn-round  bold" color="primary" type="button" onClick={navigatetoetudiant}>
profils des étudiants
                         </Button>

                         </div>
      </Container>
    </div>
    </div>
    </div>
  );
}
