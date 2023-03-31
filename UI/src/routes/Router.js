import { useRoutes } from "react-router-dom";
import { lazy } from "react";

import { Navigate } from "react-router-dom";

import PageHeader from "components/PageHeader/PageHeader.js";
const Profil= lazy(() => import("../views/profils.js"));
const Etud= lazy(() => import("../views/etud.js"));
const Event= lazy(() => import("../views/event.js"));
const General= lazy(() => import("../views/général.js"));
const Index= lazy(() => import("../views/Index.js"));
const Prof= lazy(() => import("../views/prof.js"));
const Sujet= lazy(() => import("../views/sujets.js"));
const Reunion= lazy(() => import("../views/reunion.js"));
const Result= lazy(() => import("../views/result.js"));



/* const Prof= lazy(() => import("../pages/profiles/prof"));
const Student= lazy(() => import("../pages/profiles/student"));
const Event= lazy(() => import("../pages/events"));
const Ds= lazy(() => import("../pages/schedules/ds"));
const Exam= lazy(() => import("../pages/schedules/exam"));
const Rattrapage= lazy(() => import("../pages/schedules/rattrapage"));
const Temps= lazy(() => import("../pages/schedules/temps"));
const Resultexam= lazy(() => import("../pages/result/exam"));
const Resultpcd= lazy(() => import("../pages/result/pcd"));
const rResultpfe= lazy(() => import("../pages/result/pfe"));
const esultpe= lazy(() => import("../pages/result/pe"));

const Subjectpcd= lazy(() => import("../pages/subject/pcd"));
const Subjectpfe= lazy(() => import("../pages/subject/pfe"));
const Subjectpe= lazy(() => import("../pages/subject/pe"));
const Meetonline= lazy(() => import("../pages/meet/online"));
const Meetpresentiel= lazy(() => import("../pages/meet/presentiel"));
 */

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

    ]);
    

return ThemeRoutes ;}

 