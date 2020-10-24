import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Reset from './components/ResetPassword/ResetPassword'
import Home from './components/Home/Home'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/forgotpassword' component={Reset}/>
        <Route path='/home' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
