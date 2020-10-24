import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login';


function App() {
  return (
    <Router>
      <Login/>
      <Switch>
        <Route path='/' />
      </Switch>
    </Router>
  );
}

export default App;
