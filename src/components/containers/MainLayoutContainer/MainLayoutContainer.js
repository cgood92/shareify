import React from 'react'
import { myFirebaseRef, myFirebaseAuth, user } from '../../../globals.js'

import { connect } from 'react-redux';
import Store from '../../../Store.js';

import MainLayout from '../../views/MainLayout/MainLayout.js';

class MainLayoutContainer extends React.Component {

  componentDidMount() {
    user().then((user) => {
      var userId = user.uid;
      myFirebaseRef.child("boards").orderByChild("user/" + userId).equalTo(userId).on("value", (snapshot) => { 
        Store.dispatch({
          type: 'FETCH_OWNED_BOARDS',
          boards: snapshot.val()
        });
      });
    }).catch(() => {});

    myFirebaseAuth.onAuthStateChanged((authData) => {
        var loggedIn = false;
        if (authData) {
          loggedIn = true;
        }
        Store.dispatch({
          type: 'UPDATE_USER',
          loggedIn
        });
    });
  }

  componentWillUnmount() {
  }

  logout(e) {
    myFirebaseAuth.signOut();
    this.props.router.push('/login');
    return false;
  }

  getBoard(){
    var boardId = this.props.params.boardId;
    if (this.props.collections.current) {
      return {
        id: boardId,
        title: (this.props.boards.boards[boardId] || {}).title
      };
    } else { return {}; }
  }

  getCollection(){
    var collectionId = this.props.params.collectionId;
    if (this.props.collections.current) {
      return {
        id: collectionId,
        title: (this.props.collections.collections[collectionId] || {}).title
      };
    } else { return {}; }
  }

  render() {
    var board = this.getBoard.call(this);
    var collection = this.getCollection.call(this);
    return (<MainLayout board={board} collection={collection} loggedIn={this.props.user.loggedIn} children={this.props.children} controllers={{ logout: this.logout.bind(this) }}/>);
  }
}

const mapStateToProps = function(store) {
    return store;
};

export default connect(mapStateToProps)(MainLayoutContainer);
