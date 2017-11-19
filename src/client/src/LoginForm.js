import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
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
            />
          </div>

          <div>
            <label>Password: </label>
            <input 
              type={'password'}
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

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}

ReactDOM.render(<LoginForm />, document.getElementById('root'));

export default LoginForm;