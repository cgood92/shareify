import React from 'react'
import { myFirebaseRef } from '../../globals.js'

import ChatCard from '../ChatCard/ChatCard.js'
import { Link } from 'react-router'

class CollectionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Title coming...",
            author: "Author coming...",
            description: "Description coming...",
            boardId: this.props.boardId,
            id: this.props.id
        };
    }

    updateFromFB(snapshot) {
        if (snapshot.exists()) {
            var collection = snapshot.val();
            this.state = {
                title: collection.title,
                author: collection.author,
                description: collection.description,
                id: this.state.id,
                boardId: this.state.boardId
            };
            this.setState(this.state);
        }
    }

    componentDidMount() {
        myFirebaseRef.child("collections").child(this.state.id).on("value", this.updateFromFB.bind(this));
    }

    componentWillUnmount() {
        myFirebaseRef.child("collections").child(this.state.id).off("value", this.updateFromFB.bind(this));
    }

    remove(e) {
        // Remove board from DB
        myFirebaseRef.child("collections").child(this.state.id).remove(function(){
        });
    }

    render() {
        var { id, boardId, title, author, description } = this.state;
        return (
            <div className="collectionCard card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="right card__editCont activator"><i className="material-icons">more_vert</i></span>
                    <Link to={"/" + boardId + "/" + id}><div className="collectionCard__title card-title grey-text">{title}</div></Link>
                    <div className="collectionCard__author blue-grey-text">Shared by {author}</div>
                    <p className="collectionCard__description">{description}</p>
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

export default CollectionCard;