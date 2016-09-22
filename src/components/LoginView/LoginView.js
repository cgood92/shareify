import React from 'react'
import { myFirebaseRef, myFirebaseAuth, FirebaseLibrary, user } from '../../globals.js'

import { withRouter } from 'react-router'

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleThirdPartyLogin(providerName) {
    var thirdPartyPromise = this.thirdPartyLogin(providerName);

    this.handleAuthResponse(thirdPartyPromise);

    return false;   
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
      myFirebaseRef.signInWithEmailAndPassword(email, password).then(function(user) {
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
      return this.createUser(email, password).then(function () {
          return this.authWithPassword(email, password);
      });
  }

  handleAuthResponse(promise) {
    promise.then((user) => {
      this.props.router.push('/');
    }).catch(() => {
      alert("There was an error in logging you in.  Please try again.");
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

  render() {
    return (
      <div className="authentication">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <div className="card blue-grey darken-2">
              <div className="card-content white-text">
                 <h2>Login</h2>
                <form className="login">
                    <div className="form-group">
                        <label htmlFor="txtEmail">Email address</label>
                        <input type="email" className="form-control" id="txtEmail" placeholder="Enter email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtPass">Password</label>
                        <input type="password" className="form-control" id="txtPass" placeholder="Password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-default btn-block login__button">Login</button>
                     <span className="login__other">OR you can login with: 
                       <ul className="login__socialButtons">
                        <li><a className="btn btn-primary bt-social" data-provider="facebook" onClick={this.handleThirdPartyLogin.bind(this, 'Facebook')}>Facebook</a></li>
                        <li><a className="btn btn-primary bt-social" data-provider="google" onClick={this.handleThirdPartyLogin.bind(this, 'Google')}>Google</a></li>
                        <li><a className="btn btn-info bt-social" data-provider="twitter" onClick={this.handleThirdPartyLogin.bind(this, 'Twitter')}>Twitter</a></li>
                        <li><a className="btn btn-default bt-social" data-provider="github" onClick={this.handleThirdPartyLogin.bind(this, 'Github')}>GitHub</a></li>
                       </ul>
                     </span>
                </form>
              </div>
            </div>
            <div className="card blue-grey darken-3">
              <div className="card-content white-text">
                <form className="register" id="register" onSubmit={this.register.bind(this)}> 
                   <h2>Register</h2>

                  <div className="form-group">
                      <label htmlFor="txtRegEmail">Email address</label>
                      <input type="email" className="form-control" id="txtEmail" placeholder="Enter email" name="email" />
                  </div>
                  <div className="form-group">
                      <label htmlFor="txtRegPass">Password</label>
                      <input type="password" className="form-control" id="txtPass" placeholder="Password" name="password" />
                  </div>
                  <button type="submit" className="btn btn-default">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginView);