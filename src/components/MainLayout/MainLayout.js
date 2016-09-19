import React from 'react'
import { userId, myFirebaseRef } from '../../globals.js'

import { Link } from 'react-router'

class MainLayout extends React.Component {
  render() {
    var { boardId, collectionId } = this.props.params;
    var breadcrumbs = <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Home</Link></li>
            {boardId ? <li><Link to={"/" + boardId}>{boardId}</Link></li> : null}
            {collectionId ? <li><Link to={"/" + boardId + '/' + collectionId}>{collectionId}</Link></li> : null}
        </ul>;
    return (
      <div className="app">
        <nav>
            <div className="nav-wrapper blue-grey darken-4">
                <Link to="/" className="brand-logo">Shareify</Link>
                {breadcrumbs}
            </div>
        </nav>
        <main>
          {this.props.children}
        </main>
        <footer className="page-footer blue-grey darken-4">
          <div className="footer-copyright">© 2016</div>
        </footer>
      </div>
      )
  }
}

export default MainLayout;