import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import CryptoJS from 'crypto-js';
import Config from './Config';
import Api from './Api';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '', 
      password: '',
      redirectToReferrer: false
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username: </label>
            <input
              value={this.state.username} 
              onChange={this.handleUsernameChange} 
            />
          </div>

          <div>
            <label>Password: </label>
            <input 
              type={'password'} 
              onChange={this.handlePasswordChange} 
            />
          </div>

          <div>
            <button>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  handleUsernameChange(e) {
    this.setState({ 
      username: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({ 
      password: e.target.value
    });
  }

  handleLoginAPI(data, authCallback){
    Api.auth(data, authCallback);
  }

  redirectAuth(){
    
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.username.length || !this.state.password.length) {
      alert('Username and Password is required for login!');
      return;
    }

    let data = {
      username: this.state.username,
      password: this.state.password
    };

    let hashdata = CryptoJS.AES.encrypt(JSON.stringify(data), Config.encrypt_key);
    /*console.log('Hash', hashdata.toString());*/
    this.handleLoginAPI(hashdata.toString(), this.redirectAuth);
  }
}

/* No need ReactDOM render for this */
/*ReactDOM.render(<LoginForm />, document.getElementById('root'));*/

export default LoginForm;