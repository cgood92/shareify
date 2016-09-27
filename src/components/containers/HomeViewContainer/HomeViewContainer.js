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
    }

    componentWillUnmount() {
    }

    render() {
        var boardObj = this.props.boards.boards;
        var boards = Object.keys(boardObj).map((key) => {
            var board = boardObj[key];
            board.id = key;
            return board;
        }).filter((obj) => {
            return obj.permissionToBoard;
        });
        return (<HomeView loggedIn={this.props.user.loggedIn} boards={boards}/>);
    }
}

const mapStateToProps = function(store) {
    return store;
};

export { fetchBoards };
export default connect(mapStateToProps)(HomeViewContainer);
