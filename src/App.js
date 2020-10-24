import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Reset from './components/ResetPassword'


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path="/forgotpassword" component={Reset}/>
      </Switch>
    </Router>
  );
}

export default App;
