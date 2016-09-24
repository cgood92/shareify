import React from 'react'

import { connect } from 'react-redux';
import { myFirebaseRef, user } from '../../../globals.js'
import Store from '../../../Store.js';

import BoardView from '../../views/BoardView/BoardView.js'

class BoardViewContainer extends React.Component {

    updateCollectionsFromFB(snapshot) {
        var collections = [];
        if (snapshot.exists()){
            collections = Object.keys(snapshot.val());
        }
        Store.dispatch({
            type: 'FETCH_BOARD',
            collections
        });
    }

    updateBoardFromFB(snapshot) {
        if (snapshot.exists()){
            var result = snapshot.val();
            user().then((user) => {
                Store.dispatch({
                    type: 'UPDATE_BOARD',
                    permissionToBoard: Boolean(result.user[user.uid]),
                    title: result.title
                });
            }).catch(() => {
                Store.dispatch({
                    type: 'UPDATE_BOARD',
                    permissionToBoard: false,
                    title: result.title
                });
            });
        } else {
            Store.dispatch({
                type: 'UPDATE_BOARD',
                title: ''
            });
        }
    }

    componentDidMount() {
        var boardId = this.props.params.boardId;
        Store.dispatch({
            type: 'UPDATE_BOARD',
            id: boardId
        });
        myFirebaseRef.child("collections").orderByChild("board/" + boardId).equalTo(boardId).on("value", this.updateCollectionsFromFB.bind(this));
        myFirebaseRef.child("boards/" + boardId).on("value", this.updateBoardFromFB.bind(this));
    }

    componentWillUnmount() {
        var boardId = this.props.params.boardId;
        myFirebaseRef.child("collections").orderByChild("board/" + boardId).equalTo(boardId).off("value", this.updateCollectionsFromFB.bind(this));
        myFirebaseRef.child("boards/" + boardId).off("value", this.updateBoardFromFB.bind(this));
    }

    render() {
        return (<BoardView {...this.props.board}/>);
    }
}

const mapStateToProps = function(store) {
    return {
        board: store.boardState
    };
};

export default connect(mapStateToProps)(BoardViewContainer);
