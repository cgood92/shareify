import React from 'react'
import { userId, myFirebaseRef, myFirebaseAuth } from '../../globals.js'

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

  // Handle third party login providers
  // returns a promise
  thirdPartyLogin(providerName) {
      var deferred = $.Deferred();

      console.log(providerName + 'AuthProvider');
      console.log(myFirebaseAuth);
      console.log(myFirebaseAuth[providerName + 'AuthProvider']);
      var provider = new myFirebaseAuth[providerName + 'AuthProvider']();
      myFirebaseAuth.authWithOAuthPopup(provider).then(function(result){
        deferred.resolve(user);
      }).catch(function(err){
        deferred.reject(err);
      });
      return deferred.promise();
  };

  // Handle Email/Password login
  // returns a promise
  authWithPassword(email, password) {
      var deferred = $.Deferred();
      myFirebaseRef.signInWithEmailAndPassword(email, password).then(function(user) {
          deferred.resolve(user);
      }).catch(function(err){
          deferred.reject(err);
      });
      return deferred.promise();
  }

  // create a user but not login
  // returns a promsie
  createUser(email, password) {
      var deferred = $.Deferred();
      myFirebaseAuth.createUserWithEmailAndPassword(email, password).then(function(user){
        deferred.resolve();
      }).catch(function(err){
        deferred.reject(err);
      });
      return deferred.promise();
  }

  // Create a user and then login in
  // returns a promise
  createUserAndLogin(email, password) {
      return this.createUser(email, password).then(function () {
          return this.authWithPassword(email, password);
      });
  }

  // route to the specified route if sucessful
  // if there is an error, show the alert
  handleAuthResponse(promise, route) {
      $.when(promise)
          .then(function (authData) {
            console.log('Success in handling response');
      }, function (err) {
          console.log(err);
      });
  }

  register(e) {
    var form = e.target,
    elements = form.elements,
    email = elements.namedItem("email").value,
    password = elements.namedItem("password").value;
    var loginPromise = this.createUserAndLogin(email, password);

    this.handleAuthResponse(loginPromise, 'profile');

    e.preventDefault();
    return false;
  }

  render() {
    return (
      <div className="authentication">
          <form className="login">
               <h2>Login</h2>

              <div className="form-group">
                  <label htmlFor="txtEmail">Email address</label>
                  <input type="email" className="form-control" id="txtEmail" placeholder="Enter email" name="email" />
              </div>
              <div className="form-group">
                  <label htmlFor="txtPass">Password</label>
                  <input type="password" className="form-control" id="txtPass" placeholder="Password" name="password" />
              </div>
              <button type="submit" className="btn btn-default btn-block">Login</button>
              <br />
              <br />
               <h4>Login with</h4>
          <a className="btn btn-primary bt-social" data-provider="facebook" onClick={this.thirdPartyLogin.bind(this, 'Facebook')}>Facebook</a>
          <a className="btn btn-primary bt-social" data-provider="google" onClick={this.thirdPartyLogin.bind(this, 'Gacebook')}>Google</a>
          <a className="btn btn-info bt-social" data-provider="twitter" onClick={this.thirdPartyLogin.bind(this, 'Twitter')}>Twitter</a>
          <a className="btn btn-default bt-social" data-provider="github" onClick={this.thirdPartyLogin.bind(this, 'Github')}>GitHub</a>

          </form>
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
    );
  }
}

export default LoginView;