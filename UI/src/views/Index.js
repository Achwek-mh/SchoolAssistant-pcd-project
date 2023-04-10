/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { lazy } from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Prof from "views/profils/prof.js";
import Etud from "views/profils/etud.js";

const Profil= lazy(() => import("../views/profils/profils.js"));
const Event= lazy(() => import("../views/event.js"));
const Sujet= lazy(() => import("../views/sujets/sujets.js"));
const Reunion= lazy(() => import("../views/reunions/reunion.js"));
const Online= lazy(() => import("../views/reunions/online.js"));
const Presentiel= lazy(() => import("../views/reunions/presentiel.js"));
const Sujetpcd= lazy(() => import("../views/sujets/sujet_pcd.js"));
const Sujetpfe= lazy(() => import("../views/sujets/sujet_pfe.js"));
const Sujetpe= lazy(() => import("../views/sujets/sujet_pe.js"));
const Général=lazy(() => import("../views/général.js"));

const Result= lazy(() => import("../views/result/result.js"));
const ResultPCD= lazy(() => import("../views/result/result_pcd.js"));
const ResultPFE= lazy(() => import("../views/result/result_pfe.js"));
const ResultPE= lazy(() => import("../views/result/result_pe.js"));
const ResultEXAM= lazy(() => import("../views/result/result_exam.js"));

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
      
        {/*   <Basics />
          <Navbars />
          <Tabs />
          <Pagination />
          <Notifications />
          <Typography />
          <JavaScript />
          <NucleoIcons />
          <Signup />
          <Examples />
          <Download /> */}
        </div>
      </div>
    </>
  );
}
