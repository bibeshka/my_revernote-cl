import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const firebase = require('firebase');


export default class SignUp extends Component {
  
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: ''
    }
  }

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'password':
        this.setState({ password: e.target.value });
        break;
      case 'passwordConfirmation':
        this.setState({ passwordConfirmation: e.target.value })
        break;

      default:
        break;
    }
  }
  
  submitSignup = (e) => {
    e.preventDefault();

    if(!this.formIsValid()) {
      this.setState({ signupError: 'Password do not match' });
      return
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authRes => {
        const userObj = {
          email: authRes.user.email,
        };
        firebase
          .firestore()
          .collection('users')
          .doc(this.state.email)
          .set(userObj)
          .then(() => {
            this.props.history.push('/dashboard')
          }, dbError => {
            console.log(dbError);
            this.setState({ signupError: 'Failed to add user' });
          })
      }, authError => {
        console.log(authError);
        this.setState({ signupError: 'Failed to add user' });
        
      })
      console.log('SUBNITTING', this.state);
  }

  render() {
    return (
      <div className="login-main-container">
        
        <h1><span>My</span> Evernote</h1>
        <p>Remember all, wat's important</p>

        <form className="login-from-container" onSubmit={(e) => this.submitSignup(e)}>
          <input 
            className="input" 
            placeholder="Enter Your Email" 
            type="email" autoComplete="email"
            onChange={(e) => this.userTyping('email', e)}/>
          <input 
            className="input" 
            placeholder="Enter Your Pass" type="password"
            onChange={(e) => this.userTyping('password', e)} />
          <input 
            className="input" 
            placeholder="Confirm Your Pass" type="password"
            onChange={(e) => this.userTyping('passwordConfirmation', e)} />
          <button className="btn btn-bg" type="submit">Confirm</button>
        </form>

        {/* Signup Errors  */}
        {
          this.state.signupError ?
          <h4 className="error-message">
            {this.state.signupError}
          </h4> :
          null
        }

        <p>Already have an account ?</p>
        <Link to="/login">
          <h3>Log in</h3>
        </Link>
      
      </div>
    )
  }
}
