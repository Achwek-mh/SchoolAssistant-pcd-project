import { Routes, Route, useNavigate } from "react-router-dom";
import React from "react";
import "./pageheader.css"
import {
  
  Container,
  
} from "reactstrap";

import { useState, useEffect } from "react";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

export default function PageHeader() {
  
  const [size, setSize] = useState(70); // taille de départ du texte en pixels
  const [text, setText] = useState(""); //texte alli yodhehr mil awel bel kol
  const redirect = async (e) => {
    const res = await fetch("http://localhost:5000/open_website");
    const data = await res.json();
  };
  //const [text, setText] = useState('Hello World!');
  const chaine = " *Hello! I'm a smart school assistant. I'm here to help you, Say your choice and I will be with you!"
  //style de l introduction
  const myStyle = {
    fontFamily: "Arial, sans-serif"
  };

  //fonction pour lire fonction
  

  
  const [showButtons, setShowButtons] = useState(false);
  useEffect(() => {
    redirect();
    typeWriter(chaine);
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 15000);

    const timeout = setTimeout(() => {
      setSize(30); // réduire la taille du texte à 50 pixels après 5 secondes
    }, 15000);

    
    return () => clearTimeout(timeout); //arret


    return () => clearTimeout(timer);

  }, []);

  const typeWriter = (text) => {
    let i = 0;
    const speed = 100; // vitesse de frappe en ms
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);
  };

  const buttons = [
    { label: "Espace profils", onClick: () => alert("Bouton 1 cliqué") },
    { label: "Espace sujet", onClick: () => alert("Bouton 2 cliqué") },
    { label: "Espace resultat", onClick: () => alert("Bouton 3 cliqué") },
    { label: "Espace events", onClick: () => alert("Bouton 4 cliqué") },
    { label: "Espace emploi", onClick: () => alert("Bouton 5 cliqué") },
    { label: "Espace meet", onClick: () => alert("Bouton 6 cliqué") },
    { label: "Informations générales", onClick: () => alert("Bouton 7 cliqué") }
  ];

  const navigate = useNavigate();

  const navigatetoprofil = (e) => {
    e.preventDefault();
    navigate("/profil");
  };

  const navigatetosujet = (e) => {
    navigate("/sujet");
  };
  const navigatetoresult = (e) => {
    navigate("/result");
  };


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

          <h1 className="my-class">
            
            <p style={{ fontSize: `${size}px`, color: '#E1DBBD'}}>{text}</p>
          </h1>

          
          

          {showButtons && buttons.map((button, index) => (
            <button 

            key={index} 

            className="btn-round"
            color="primary"
            type="button" 

            onClick={(e) => {
              navigatetoprofil(e);
            }}>

              {button.label}

            </button>
          ))}

          

    


        </div>
      </Container>
    </div>
  );
}
