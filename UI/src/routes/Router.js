import { useRoutes } from "react-router-dom";
import { lazy,useContext,useState} from "react";
import { Navigate } from "react-router-dom";
import { USER_TYPES,USER,use } from '../constants';

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
const Emploitemps= lazy(() => import("../views/schedules/emploitemps.js"));






export default function Router(){
  const [value,setValue]=useState(USER)
  let ThemeRoutes = useRoutes([
 

    
      { path: "/",
/*       element:<Profuser><Index /></Profuser>  ,
 */      element:<Unknownuser><Index /></Unknownuser> ,

      },
      { path: "/profil",
      element: <Profil />,
      
      },
      { path: "/emploitemps",
      element: <Emploitemps/>,
      
      },
      { path: "/prof",
      element:<Profuser> <Prof /></Profuser>,
      
      },
      { path: "/etud",
      element: <Etud /> ,
      
      },
      { path: "/sujet",
      element: <Studentuser><Sujet></Sujet></Studentuser> ,
      
      },
      { path: "/sujet_pcd",
      element: <Studentuser><Sujetpcd /></Studentuser> ,
      
      },
      { path: "/result",
      element: <Studentuser><Result /></Studentuser> ,
      
      },
      { path: "/reunion",
      element: <Profuser><Reunion /></Profuser> ,
      
      },
      { path: "/event",
      element: <Publicuser><Event /> </Publicuser>,
      
      },
      { path: "/login",
      element: <Face /> ,
      
      },
     
    ]);
    

return (
  <use.Provider value={{value,setValue}}>
    {ThemeRoutes}
  </use.Provider>
);}


function Profuser({ children }) {
  const { value, setValue } = useContext(use);

  if (value === USER_TYPES.PROF) {
    console.log(value)

    return (
      <>
        {children}
      </>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}
function Studentuser({ children }) {
  const { value, setValue } = useContext(use);
  if (value === USER_TYPES.STUDENT) {
    console.log(value)

    return (
      <>
        {children}
      </>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}
function Publicuser({ children }) {
  const { value, setValue } = useContext(use);
  if ((value === USER_TYPES.PROF) && (value === USER_TYPES.STUDENT) ) {
    console.log(value)
    return (
      <>
        {children}
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}
function Unknownuser({ children }) {
  const { value, setValue } = useContext(use);
  if (!((value === USER_TYPES.PUBLIC) || (value === USER_TYPES.UNKNOWN)) ) {
    console.log(value)
    return (
      <>
        {children}
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}

