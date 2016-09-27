import React from 'react'

import { connect } from 'react-redux';
import { myFirebaseRef, user } from '../../../globals.js'
import Store from '../../../Store.js';

import BoardView from '../../views/BoardView/BoardView.js'

class BoardViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // For the board
        var boardId = this.props.params.boardId,
            board = this.props.boards.boards[boardId]; 
        this.props.boards.current = boardId;
        if (board) {
            board.id = boardId;
            this.state = board;
        } else {
            myFirebaseRef.child("boards/" + boardId).on("value", (snapshot) => {
                if (snapshot.exists()) {
                    var board = snapshot.val();
                    Store.dispatch({
                        type: 'FETCH_OTHER_BOARD',
                        boards: { [boardId]: board },
                        current: boardId
                    });
                    board.id = boardId;
                    this.state = Object.assign({}, this.state, board);
                }
            });
        }
        Store.dispatch({
            type: 'UPDATE_BOARD',
            current: boardId
        });

        // For the collections
        var collections = [];
        var map = this.props.collections.map[boardId];
        // Already been fetched
        if (map) {
            for (var i in map) {
                collections.push(this.props.collections.collections[i]);
            }
            this.state.collections = collections;
        } else {
            myFirebaseRef.child("collections").orderByChild("board/" + boardId).equalTo(boardId).on("value", (snapshot) => {
                if (snapshot.exists()) {
                    var collections = snapshot.val();
                    this.state.collections = Object.keys(collections).map((i) => {
                        var collection = collections[i];
                        collection.id = i;
                        return collection;
                    });
                    Store.dispatch({
                        type: 'FETCH_COLLECTIONS',
                        collections,
                        boardId
                    });
                }
            });
        }
    }

    componentWillUnmount() {
    }

    render() {
        return (<BoardView board={this.state} />);
    }
}

const mapStateToProps = function(store) {
    return store;
};

export default connect(mapStateToProps)(BoardViewContainer);
