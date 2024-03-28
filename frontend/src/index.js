// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateBoardPage from './CreateBoardPage';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/app" element={<App />} />
      <Route path="/" element={<CreateBoardPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
reportWebVitals();
