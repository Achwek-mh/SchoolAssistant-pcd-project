import { useRoutes } from "react-router-dom";
import { lazy } from "react";

import { Navigate } from "react-router-dom";

import PageHeader from "components/PageHeader/PageHeader.js";
const Profil= lazy(() => import("../views/profils/profils.js"));
const Etud= lazy(() => import("../views/profils/etud.js"));
const Event= lazy(() => import("../views/event.js"));
const Index= lazy(() => import("../views/Index.js"));
const Prof= lazy(() => import("../views/profils/prof.js"));
const Sujet= lazy(() => import("../views/sujets/sujets.js"));
const Reunion= lazy(() => import("../views/reunions/reunion.js"));
const Online= lazy(() => import("../views/reunions/online.js"));
const Presentiel= lazy(() => import("../views/reunions/presentiel.js"));
const Sujetpcd= lazy(() => import("../views/sujets/sujet_pcd.js"));
const Sujetpfe= lazy(() => import("../views/sujets/sujet_pfe.js"));
const Sujetpe= lazy(() => import("../views/sujets/sujet_pe.js"));
const Face= lazy(() => import("../views/face.js"));

const Result= lazy(() => import("../views/result/result.js"));
const ResultPCD= lazy(() => import("../views/result/result_pcd.js"));
const ResultPFE= lazy(() => import("../views/result/result_pfe.js"));
const ResultPE= lazy(() => import("../views/result/result_pe.js"));
const ResultEXAM= lazy(() => import("../views/result/result_exam.js"));



export default function Router(){

  let ThemeRoutes = useRoutes([
 

    
      { path: "/",
      element: <Index /> ,
      
      },
      { path: "/profil",
      element: <Profil /> ,
      
      },
      { path: "/prof",
      element: <Prof /> ,
      
      },
      { path: "/etud",
      element: <Etud /> ,
      
      },
      { path: "/sujet",
      element: <Sujet /> ,
      
      },
      { path: "/sujet_pcd",
      element: <Sujetpcd /> ,
      
      },
      { path: "/result",
      element: <Result /> ,
      
      },
      { path: "/reunion",
      element: <Reunion /> ,
      
      },
      { path: "/event",
      element: <Event /> ,
      
      },
      { path: "/login",
      element: <Face /> ,
      
      },
     
    ]);
    

return ThemeRoutes ;}

 