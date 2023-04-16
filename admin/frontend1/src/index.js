import React  from 'react';
import ReactDOM from "react-dom/client";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthContextProvider} from './shared/auth'
import {DataContextProvider} from'./shared/DataContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Router from './routes/Router';
import "./scss/style.scss";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
     
  const root = ReactDOM.createRoot(document.getElementById('root')); root.render(     
     <AuthContextProvider>

<DataContextProvider>

<App /></DataContextProvider>
   </AuthContextProvider>
 );


   
  



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
