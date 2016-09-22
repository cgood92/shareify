import React from 'react'
import { myFirebaseRef } from '../../globals.js'

import ChatCard from '../ChatCard/ChatCard.js'
import { Link } from 'react-router'

class CollectionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Title coming...",
            description: "Description coming...",
            boardId: this.props.boardId,
            id: this.props.id,
            permissionToBoard: this.props.permissionToBoard
        };
    }

    updateFromFB(snapshot) {
        if (snapshot.exists()) {
            var collection = snapshot.val();
            this.state.title = collection.title;
            this.state.description = collection.description;
            this.setState(this.state);
        }
    }

    componentDidMount() {
        myFirebaseRef.child("collections").child(this.state.id).on("value", this.updateFromFB.bind(this));
    }

    componentWillUnmount() {
        myFirebaseRef.child("collections").child(this.state.id).off("value", this.updateFromFB.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.state.permissionToBoard = nextProps.permissionToBoard;
    }


    remove(e) {
        var { permissionToBoard, id } = this.state;
        if (permissionToBoard) {
            myFirebaseRef.child("collections").child(id).remove(function(){
            });
        }
    }

    render() {
        var { id, boardId, title, description, permissionToBoard } = this.state;
        return (
            <div className="collectionCard card blue-grey darken-1">
                <div className="card-content white-text">
                    {(permissionToBoard) ? <span className="right card__editCont activator"><i className="material-icons">more_vert</i></span> : null}
                    <Link to={"/" + boardId + "/" + id}><div className="collectionCard__title card-title grey-text">{title}</div></Link>
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