import React from 'react'
import { myFirebaseRef, myFirebaseAuth, user } from '../../globals.js'

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
        user().then((user) => {
            myFirebaseRef.child("boards").orderByChild("user").equalTo(user.uid).on("value", this.updateFromFB.bind(this));
        });
    }

    componentWillUnmount() {
        user().then((user) => {
            myFirebaseRef.child("boards").orderByChild("user").equalTo(user.uid).off("value", this.updateFromFB.bind(this));
        });
    }

    render() {
        var boards = this.state.boards.map(function(boardId){
            return <BoardCard id={boardId} key={boardId}/>;
        });
        return <section className="home">
            <h1 className="title">Boards</h1>
            {boards}
            <BoardCardEditable/>
        </section>;
    }
}

export default HomeView;