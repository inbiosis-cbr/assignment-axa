import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './base.css';
import LoginForm from './LoginForm.js';

const Site = () => (  
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/user" component={User}/>
    </div>
  </Router>
)

const User = () => (
  <h2>Welcome back!</h2>
)

class App extends Component {

  state = {
    redirectToReferrer: false,
    isAuthenticated: false
  }

  handleLogin = (response) => {
    if(response.token){
      this.setState({isAuthenticated: true});
    }
  }

  render() {

    //const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { from } = { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state.redirectToReferrer

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    if (this.state.isAuthenticated) {
      return (
        <Redirect to="/user" />
      ) 
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Simple login form with <strong>React</strong>
        </p>
        <LoginForm handleLogin={this.handleLogin} />
      </div>
    );
  }
}

export default Site;
