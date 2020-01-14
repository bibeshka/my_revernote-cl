import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import SignUp from './loginSystem/SignUp';
import LogIn from './loginSystem/LogIn';
import Dashboard from './components/Dashboard';


// Fire base connect
const firebase = require('firebase');
require('firebase/firestore');

try {
  firebase.initializeApp({
    apiKey: "AIzaSyAeIT3ubfSC_qHB-95SUI_w5fNlOoEEsfM",
    authDomain: "my-evernote1488-2.firebaseapp.com",
    databaseURL: "https://my-evernote1488-2.firebaseio.com",
    projectId: "my-evernote1488-2",
    storageBucket: "my-evernote1488-2.appspot.com",
    messagingSenderId: "829469732184",
    appId: "1:829469732184:web:dbf36e6b922d6d370f092d"
  });
  console.log('Succsessful connect');
} catch(error) {
  console.log(error);
}

//Displaying

function App() {
  return (
    <div>
      <Router>
        <div className="routing-container">
          <Route exact path="/" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    </div>
  );
}

export default App;
