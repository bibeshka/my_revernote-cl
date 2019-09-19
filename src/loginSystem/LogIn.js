import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const firebase = require('firebase');

export default class LogIn extends Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: ''
    }
  }

  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'password':
        this.setState({ password: e.target.value });
        break;

      default:
        break;
    }
  }

  submitLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/dashboard');
      }, err => {
        this.setState({ loginError: 'Server error' });
        console.log(err);
      })
  }

  render() {
    return (
      <div className="login-main-container">
        
        <h1><span>My</span> Evernote</h1>
        <p>Remember all, wat's important</p>

        <form className="login-from-container" onSubmit={(e) => this.submitLogin(e)}>
          <input 
            className="input" 
            placeholder="Enter Your Email" 
            type="email" autoComplete="email"
            onChange={(e) => this.userTyping('email', e)}/>
          <input 
            className="input" 
            placeholder="Enter Your Pass" type="password"
            onChange={(e) => this.userTyping('password', e)} />
          <button className="btn btn-bg" type="submit">Confirm</button>
        </form>

        <p>Dont't have an account ?</p>
        <Link to="/signup">
          <h3>Sign un</h3>
        </Link>
      
      </div>
    )
  }
}
