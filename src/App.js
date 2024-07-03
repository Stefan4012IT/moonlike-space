import React from 'react';
import './assets/styles/main.scss';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
