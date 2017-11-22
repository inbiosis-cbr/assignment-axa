import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import './base.css';
import './index.css';
import './App.css';
import logo from './logo.svg';
import LoginForm from './LoginForm.js';

import registerServiceWorker from './registerServiceWorker';

const Page = () => (
	<Router>
		<Route exact path="/" component={Login}/>
		<Route path="/login" component={Auth}/>
	</Router>
)

const Login = () => (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Welcome to React</h1>
		</header>
		<p className="App-intro">
			Simple login form with <strong>React</strong>
		</p>
		<LoginForm />
	</div>
)

const Auth = () => (
  <div>
    <h2>Welcome!</h2>
  </div>
)

class App extends React.Component {
  	render() {
    	return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					Simple login form with <strong>React</strong>
				</p>
				<LoginForm />
			</div>
    	);
  	}
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

export default Page
