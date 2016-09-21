import React from 'react'
import { myFirebaseRef } from '../../globals.js'

import ChatCard from '../ChatCard/ChatCard.js'
import { Link } from 'react-router'

class BoardCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Title coming...",
            author: "Author coming...",
            description: "Description coming...",
            id: this.props.id
        };
    }

    updateFromFB(snapshot) {
        if (snapshot.exists()) {
            var board = snapshot.val();
            this.state = {
                title: board.title,
                author: board.author,
                description: board.description,
                id: this.state.id
            };
            this.setState(this.state);
        }
    }

    componentDidMount() {
        myFirebaseRef.child("boards/" + this.state.id).on("value", this.updateFromFB.bind(this));
    }

    componentWillUnmount() {
        myFirebaseRef.child("boards/" + this.state.id).off("value", this.updateFromFB.bind(this));
    }

    remove(e) {
        // Remove board from DB
        myFirebaseRef.child("boards/" + this.state.id).remove(function(){
        });
    }

    render() {
        var { id, title, author, description } = this.state;
        return (
            <div className="boardCard card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="right card__editCont activator"><i className="material-icons">more_vert</i></span>
                    <Link to={"/" + id}><div className="boardCard__title card-title grey-text">{title}</div></Link>
                    <div className="boardCard__author blue-grey-text">Shared by {author}</div>
                    <p className="boardCard__description">{description}</p>
                    <ChatCard/>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">close</i></span>
                    <ul className="editOptions">
                        <li onClick={this.remove.bind(this)}>Delete<i className="material-icons left">close</i></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default BoardCard;
