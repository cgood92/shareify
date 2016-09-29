import React from 'react'
import { myFirebaseRef, myFirebaseAuth, FirebaseLibrary, user } from '../../../globals.js'

import { connect } from 'react-redux';
import Store from '../../../Store.js';

import { withRouter } from 'react-router'

import LoginView from '../../views/LoginView/LoginView.js';

class LoginViewContainer extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleThirdPartyLogin(providerName) {
    return () => {
      var thirdPartyPromise = this.thirdPartyLogin(providerName);

      this.handleAuthResponse(thirdPartyPromise);

      return false;   
    };
  }

  thirdPartyLogin(providerName) {
    return new Promise(function(resolve, reject) {
      var provider = new FirebaseLibrary.auth[providerName + 'AuthProvider']();
      myFirebaseAuth.signInWithPopup(provider).then(function(result){
        resolve(result);
      }).catch(function(err){
        reject(err);
      });
    });
  };

  authWithPassword(email, password) {
    return new Promise(function(resolve, result){
      myFirebaseAuth.signInWithEmailAndPassword(email, password).then(function(user) {
          resolve(user);
      }).catch(function(err){
          reject(err);
      });
    });
  }

  createUser(email, password) {
    return new Promise(function(resolve, reject){
      myFirebaseAuth.createUserWithEmailAndPassword(email, password).then(function(user){
        resolve();
      }).catch(function(err){
        reject(err);
      });
    });
  }

  createUserAndLogin(email, password) {
      return this.createUser(email, password).then(() => {
          return this.authWithPassword(email, password);
      });
  }

  handleAuthResponse(promise) {
    promise.then((user) => {
      this.props.router.push('/');
    }).catch((e) => {
      console.log(e);
      alert('There was an error in logging you in.  Message: "' + e.message + '"');
    });
  }

  register(e) {
    var form = e.target,
    elements = form.elements,
    email = elements.namedItem("email").value,
    password = elements.namedItem("password").value;
    var loginPromise = this.createUserAndLogin(email, password);

    this.handleAuthResponse(loginPromise);

    e.preventDefault();
    return false;
  }

  login(e) {
    var form = e.target,
    elements = form.elements,
    email = elements.namedItem("email").value,
    password = elements.namedItem("password").value;
    var loginPromise = this.authWithPassword(email, password);

    this.handleAuthResponse(loginPromise);

    e.preventDefault();
    return false;
  }

  render() {
    return (<LoginView controllers={{
      register: this.register.bind(this),
      handleThirdPartyLogin: this.handleThirdPartyLogin.bind(this),
      login: this.login.bind(this)
    }}/>);
  }
}

const mapStateToProps = function(store) {
    return {
        login: store.loginState
    };
};

export default connect(mapStateToProps)(withRouter(LoginViewContainer));
