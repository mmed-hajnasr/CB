import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleLogin from './components/FireBase/GoogleLogin';
import { BrowserRouter as Router} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>

          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<GoogleLogin />} />
          </Routes>
    </Router>
  </React.StrictMode>
);
