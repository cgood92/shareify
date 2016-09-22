import React from 'react'
import { myFirebaseRef, myFirebaseAuth, user } from '../../globals.js'

import { Link } from 'react-router'
import BoardCard from '../BoardCard/BoardCard.js'
import BoardCardEditable from '../BoardCardEditable/BoardCardEditable.js'

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            loggedIn: false
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
            this.state.loggedIn = true;
            myFirebaseRef.child("boards").orderByChild("user/" + user.uid).equalTo(user.uid).on("value", this.updateFromFB.bind(this));
        }).catch(() => {
            this.state.loggedIn = false;
            this.setState(this.state);
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
        var boardSection = (this.state.loggedIn) ? <section className="home__boards">
                <h1 className="title">Boards</h1>
                {boards}
                <BoardCardEditable/>
            </section> : null;
        return <section className="home">
            {(this.state.loggedIn) ? boardSection :
                <section className="home__loggedOut">
                    It looks like you have not signed in yet, so your home screen will be empty.  If you want to create an account or log into an existing account, please visit the <Link to="/login">Login Page</Link>.
                </section>
            }
        </section>;
    }
}

export default HomeView;