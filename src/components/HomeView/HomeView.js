import React from 'react'
import { userId, myFirebaseRef } from '../../globals.js'

import BoardCard from '../BoardCard/BoardCard.js'
import BoardCardEditable from '../BoardCardEditable/BoardCardEditable.js'

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: []
        };
    }

    updateFromFB(snapshot) {
        if (snapshot.exists()) {
            var boards = snapshot.val();
            this.state.boards = Object.keys(boards);
            this.setState(this.state);
        } else {
            this.state.boards = [];
            this.setState(this.state);
        }
    }

    componentDidMount() {
        myFirebaseRef.child("boards").orderByChild("user").equalTo(userId).on("value", this.updateFromFB.bind(this));
    }

    componentWillUnmount() {
        myFirebaseRef.child("boards").orderByChild("user").equalTo(userId).off("value", this.updateFromFB.bind(this));
    }

    render() {
        var boards = this.state.boards.map(function(boardId){
            return <BoardCard id={boardId} key={boardId}/>;
        });
        return <section className="home">
            {boards}
            <BoardCardEditable/>
        </section>;
    }
}

export default HomeView;