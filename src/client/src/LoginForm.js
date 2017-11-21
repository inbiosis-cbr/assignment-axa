import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import Config from './Config';
import Api from './Api';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '', 
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
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

  handleLoginAPI(data){
    Api.auth(data);
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

    {/* Encrypt the data before fetching api. */}
    let hashdata = CryptoJS.AES.encrypt(JSON.stringify(data), Config.encrypt_key);
    console.log(hashdata);
    this.handleLoginAPI(hashdata);
  }
}

ReactDOM.render(<LoginForm />, document.getElementById('root'));

export default LoginForm;