import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Login from "./auth/Login.js";

const App = () => {
    // const routing = useRoutes(Router);

    return <div className = "dark" >
        <BrowserRouter>
         <Router />
        </BrowserRouter>
          </div>;
};

export default App;