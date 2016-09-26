import React from 'react'
import { myFirebaseRef, myFirebaseAuth, user } from '../../../globals.js'

import { connect } from 'react-redux';
import Store from '../../../Store.js';

import MainLayout from '../../views/MainLayout/MainLayout.js';

class MainLayoutContainer extends React.Component {

  updateBoardFromFB(snapshot) {
    if (snapshot.exists()){
      Store.dispatch({
        type: 'UPDATE_BOARD',
        title: snapshot.val()
      });
    } else {
      Store.dispatch({
        type: 'UPDATE_BOARD',
        title: null
      });
    }
  }

  updateCollectionFromFB(snapshot) {
    if (snapshot.exists()){
      Store.dispatch({
        type: 'UPDATE_COLLECTION',
        title: snapshot.val()
      });
    } else {
      Store.dispatch({
        type: 'UPDATE_COLLECTION',
        title: null
      });
    }
  }

  componentDidMount() {
    var { collectionId, boardId } = this.props;
    if (collectionId) {
      myFirebaseRef.child("collections/" + collectionId + "/title").on("value", this.updateCollectionFromFB.bind(this));
    } 

    if (boardId) {
      myFirebaseRef.child("boards/" + boardId + "/title").on("value", this.updateBoardFromFB.bind(this));
    }

    user().then(() => {
      Store.dispatch({
        type: 'UPDATE_LOGIN',
        loggedIn: true
      });
    }).catch(function(){
    });
    myFirebaseAuth.onAuthStateChanged((authData) => {
        var loggedIn = false;
        if (authData) {
          loggedIn = true;
        }
        Store.dispatch({
          type: 'UPDATE_LOGIN',
          loggedIn
        });
    });
  }

  componentWillUnmount() {
    var { collectionId, boardId } = this.props;
    if (collectionId) {
      myFirebaseRef.child("collections/" + collectionId + "/title").off("value", this.updateCollectionFromFB.bind(this));
    } 

    if (boardId) {
      myFirebaseRef.child("boards/" + boardId + "/title").off("value", this.updateBoardFromFB.bind(this));
    }
  }

  logout(e) {
    myFirebaseAuth.signOut();
    this.props.router.push('/login');
    return false;
  }

  render() {
    return (<MainLayout {...this.props.mainLayout} children={this.props.children} controllers={{ logout: this.logout.bind(this) }}/>);
  }
}

const mapStateToProps = function(store) {
    return {
      mainLayout: store.mainLayoutState
    };
};

export default connect(mapStateToProps)(MainLayoutContainer);
