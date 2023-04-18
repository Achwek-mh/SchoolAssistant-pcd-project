
import React, { useEffect } from 'react';
import { lazy } from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Général from "../views/général.js";
import PageHeader from "components/PageHeader/PageHeader.js";



/*import Footer from "components/Footer/Footer.js"; */



export default function Index() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <div className="main">
        <Général />
      
        </div>
      </div>
    </>
  );
}
