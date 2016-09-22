import React from 'react'
import { myFirebaseRef, myFirebaseAuth, user } from '../../globals.js'

import { Link, withRouter } from 'react-router'

class MainLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {
        id: this.props.params.boardId,
        title: null
      },
      collection: {
        id: this.props.params.collectionId,
        title: null
      },
      loggedIn: false
    };
  }

  updateBoardFromFB(snapshot) {
    if (snapshot.exists()){
      this.state.board.title = snapshot.val();
      this.setState(this.state);
    } else {
      this.state.board.title = null;
      this.setState(this.state);
    }
  }

  updateCollectionFromFB(snapshot) {
    if (snapshot.exists()){
      this.state.collection.title = snapshot.val();
      this.setState(this.state);
    } else {
      this.state.collection.title = null;
      this.setState(this.state);
    }
  }

  mount() {
    var collectionId = this.state.collection.id;
    if (collectionId) {
      myFirebaseRef.child("collections/" + collectionId + "/title").on("value", this.updateCollectionFromFB.bind(this));
    } 

    var boardId = this.state.board.id;
    if (boardId) {
      myFirebaseRef.child("boards/" + boardId + "/title").on("value", this.updateBoardFromFB.bind(this));
    }
    user().then(() => {
      this.state.loggedIn = true;
      this.setState(this.state);
    }).catch(function(){
    });
    myFirebaseAuth.onAuthStateChanged((authData) => {
        if (authData) {
          this.state.loggedIn = true;
        } else {
          this.state.loggedIn = false;
        }
        this.setState(this.state);
    });
  }

  componentDidMount() {
    this.mount.apply(this);
  }

  componentWillUnmount() {
    var collectionId = this.state.collection.id;
    if (collectionId) {
      myFirebaseRef.child("collections/" + collectionId + "/title").off("value", this.updateCollectionFromFB.bind(this));
    }
    var boardId = this.state.board.id;
    if (boardId) {
      myFirebaseRef.child("boards/" + boardId + "/title").off("value", this.updateBoardFromFB.bind(this));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      board: {
        id: nextProps.params.boardId,
        title: null
      },
      collection: {
        id: nextProps.params.collectionId,
        title: null
      }
    };
    this.setState(this.state);
    this.mount.apply(this);
  }

  logout(e) {
    myFirebaseAuth.signOut();
    this.props.router.push('/login');
    return false;
  }

  render() {
    var { board, collection } = this.state;
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
              { (this.state.loggedIn) ? <a className='right logout' onClick={this.logout.bind(this)}>Logout</a> : <Link to="/login" className="right">Login</Link>}
          </div>
        </nav>
        <main>
          {this.props.children}
        </main>
        <footer className="page-footer blue-grey darken-4">
          <div className="footer-copyright">© 2016</div>
        </footer>
      </div>
    );
  }
}

export default withRouter(MainLayout);