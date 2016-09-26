import React from 'react'

import { Link, withRouter } from 'react-router'

export default function(props) {
  var { board, collection, loggedIn, controllers } = props;
  var breadcrumbs = <ul className="hide-on-med-and-down mainNav__breadcrumb">
      {board.id ? <li><Link to={"/" + board.id}>{board.title}</Link></li> : null}
      {collection.id ? <li><Link to={"/" + board.id + '/' + collection.id}>{collection.title}</Link></li> : null}
    </ul>;
  return (
    <div className="app">
      <nav className="mainNav">
        <div className="nav-wrapper blue-grey darken-4">
            <Link to="/" className="brand-logo">Shareify</Link>
            {breadcrumbs}
            { (loggedIn) ? <a className='right logout' onClick={controllers.logout}>Logout</a> : <Link to="/login" className="right">Login</Link>}
        </div>
      </nav>
      <main>
        {props.children}
      </main>
      <footer className="page-footer blue-grey darken-4">
        <div className="footer-copyright">© 2016</div>
      </footer>
    </div>
  );
}
