import { useRoutes} from "react-router-dom";
import { lazy ,useEffect,navigate } from "react";

import { Navigate } from "react-router-dom";
import Login from "../auth/Login.js";
import { useAuthContext } from "../shared/useAuthContext";
import { Table } from "reactstrap";
import ResultPFE from "../pages/result/pfe";
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

const Home= lazy(() => import("../pages/Home"));
const Prof= lazy(() => import("../pages/profiles/prof"));
const Student= lazy(() => import("../pages/profiles/student"));
const Event= lazy(() => import("../pages/events"));
const Exam= lazy(() => import("../pages/schedules/exam"));
const Rattrapage= lazy(() => import("../pages/schedules/rattrapage"));
const Temps= lazy(() => import("../pages/schedules/temps"));
const Resultexam= lazy(() => import("../pages/result/exam"));
const Resultpcd= lazy(() => import("../pages/result/pcd"));
const Resultpfe= lazy(() => import("../pages/result/pfe"));

const Subjectpcd= lazy(() => import("../pages/subject/pcd"));
const Subjectpfe= lazy(() => import("../pages/subject/pfe"));
const Meetonline= lazy(() => import("../pages/meet/online"));
const Meetpresentiel= lazy(() => import("../pages/meet/presentiel"));


export default function Router(){
  const { user } = useAuthContext() 

  let ThemeRoutes = useRoutes([
 
    {  path: "/login",
    element:!user ? <Login/> : <Navigate to="/" />}
        
        
      ,
    
      { path: "/",
      element: <FullLayout /> ,
      children: [
        {path: "/",
        element:   <Prof /> /*  , */},
      
        
        {path: "/student",exact:true,
        element:   <Student /> },
        {path: "/event",exact:true,
        element:   <Event /> },
        {path: "/resultexam",exact:true,
        element:   <Resultexam /> },
        {path: "/resultpcd",exact:true,
        element:   <Resultpcd /> },
        {path: "/resultpfe",exact:true,
        element:   <Resultpfe /> },
        {path: "/sujetpcd",exact:true,
        element:   <Subjectpcd /> },
        {path: "/sujetpfe",exact:true,
        element:   <Subjectpfe /> },
        {path: "/online",exact:true,
        element:   <Meetonline /> },
        {path: "/presentiel",exact:true,
        element:   <Meetpresentiel /> },
        {path: "/emploitemps",exact:true,
        element:   <Temps /> },
        {path: "/emploiexam",exact:true,
        element:   <Exam /> },
        {path: "/emploirattrapage",exact:true,
        element:   <Rattrapage /> },
      ]
      },
    ]);
    

return ThemeRoutes ;}

 