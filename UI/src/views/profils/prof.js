import { useState, useEffect , useCallback} from "react";
import {Button,Label,Form,FormGroup,CustomInput,Input,Container} from "reactstrap";

export default function Général() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("")

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

 
  const handleSubmit = useCallback(async () => {
    if (message) {
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
    setAnswer(data.answer)}
  
  }, [message]);

  useEffect(() => {
    handleSpeechRecognition();
  }, [handleSpeechRecognition]);

  useEffect(() => {
    const timeoutId = setTimeout(handleSubmit, 1500);
    return () => clearTimeout(timeoutId);
  }, [handleSubmit]);
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
      <h2>Spécifier precisemment votre choix:</h2>
      <div>
      <Form /*  onSubmit={handleSubmit} */>
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
        </Form>
     
    </div>
             
             </div>
                </Container>
              </div>
            );
          }






