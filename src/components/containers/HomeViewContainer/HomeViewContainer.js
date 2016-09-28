import React from 'react'
import { myFirebaseRef, myFirebaseAuth, user } from '../../../globals.js'
import { connect } from 'react-redux';
import Store from '../../../Store.js';

import HomeView from '../../views/HomeView/HomeView.js';

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

export default connect(mapStateToProps)(HomeViewContainer);
