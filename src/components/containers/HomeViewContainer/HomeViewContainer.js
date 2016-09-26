import React from 'react'
import { myFirebaseRef, myFirebaseAuth, user } from '../../../globals.js'
import { connect } from 'react-redux';
import Store from '../../../Store.js';

import HomeView from '../../views/HomeView/HomeView.js';

function updateFromFB(snapshot) {
    var toDispatch = {
        type: 'FETCH_BOARDS',
        boards: {},
        loggedIn: true
    };
    if (snapshot.exists()) {
        toDispatch.boards = snapshot.val();
        Store.dispatch(toDispatch);
    } else {
        Store.dispatch(toDispatch);
    }
}

function fetchBoards(userId, callback) {
    myFirebaseRef.child("boards").orderByChild("user/" + userId).equalTo(userId).on("value", (snapshot) => { 
        updateFromFB.call(this, snapshot); 
        if (callback) {
            callback.call(this, snapshot); 
        }
    });
}

class HomeViewContainer extends React.Component {


    componentDidMount() {
        user().then((user) => {
            fetchBoards.call(this, user.uid);
        }).catch((e) => {
            Store.dispatch({
                type: 'FETCH_BOARDS',
                boards: [],
                loggedIn: false
            });
        });
    }

    componentWillUnmount() {
        user().then((user) => {
            myFirebaseRef.child("boards").orderByChild("user").equalTo(user.uid).off("value", updateFromFB.bind(this));
        });
    }

    render() {
        return (<HomeView {...this.props.home}/>);
    }
}

const mapStateToProps = function(store) {
    return {
        home: store.homeState
    };
};

export { fetchBoards };
export default connect(mapStateToProps)(HomeViewContainer);
