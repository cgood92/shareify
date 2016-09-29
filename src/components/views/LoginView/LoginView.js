import React from 'react'

export default function(props) {
  return (
    <div className="authentication">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <div className="card blue-grey darken-2">
            <div className="card-content white-text">
               <h2>Login</h2>
              <form className="login" onSubmit={props.controllers.login}>
                  <div className="form-group">
                      <label htmlFor="txtEmail">Email address</label>
                      <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
                  </div>
                  <div className="form-group">
                      <label htmlFor="txtPass">Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Password" name="password" />
                  </div>
                  <button type="submit" className="btn btn-default btn-block login__button">Login</button>
                   <span className="login__other">OR you can login with: 
                     <ul className="login__socialButtons">
                      <li><a className="btn btn-primary bt-social" data-provider="google" onClick={props.controllers.handleThirdPartyLogin('Google')}>Google</a></li>
                     </ul>
                   </span>
              </form>
            </div>
          </div>
          <div className="card blue-grey darken-3">
            <div className="card-content white-text">
              <form className="register" id="register" onSubmit={props.controllers.register}> 
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
