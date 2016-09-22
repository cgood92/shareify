import React from 'react'
import { myFirebaseRef, user } from '../../globals.js'

import CollectionCard from '../CollectionCard/CollectionCard.js'
import CollectionCardEditable from '../CollectionCardEditable/CollectionCardEditable.js'

class BoardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: [],
            id: this.props.params.boardId,
            title: 'Title coming soon...',
            permissionToBoard: false
        };
    }

    updateCollectionsFromFB(snapshot) {
        if (snapshot.exists()){
            this.state.collections = Object.keys(snapshot.val());
            this.setState(this.state);
        } else {
            this.state.collections = [];
            this.setState(this.state);
        }
    }

    updateBoardFromFB(snapshot) {
        if (snapshot.exists()){
            var result = snapshot.val();
            user().then((user) => {
                this.state.permissionToBoard = Boolean(result.user[user.uid]);
                this.state.title = result.title;
                this.setState(this.state);
            }).catch(() => {
                this.state.permissionToBoard = false;
                this.state.title = snapshot.val().title;
                this.setState(this.state);
            });
        } else {
            this.state.title = '';
            this.setState(this.state);
        }
    }

    componentDidMount() {
        var boardId = this.props.params.boardId;
        myFirebaseRef.child("collections").orderByChild("board/" + boardId).equalTo(boardId).on("value", this.updateCollectionsFromFB.bind(this));
        myFirebaseRef.child("boards/" + boardId).on("value", this.updateBoardFromFB.bind(this));
    }

    componentWillUnmount() {
        var boardId = this.props.params.boardId;
        myFirebaseRef.child("collections").orderByChild("board/" + boardId).equalTo(boardId).off("value", this.updateCollectionsFromFB.bind(this));
        myFirebaseRef.child("boards/" + boardId).off("value", this.updateBoardFromFB.bind(this));
    }

    render() {
        var { id, title, permissionToBoard } = this.state;
        var collections = this.state.collections.map((collection, index) => {
            return <CollectionCard boardId={id} id={collection} key={index} permissionToBoard={permissionToBoard}/>;
        });
        return <section className="collectionRow">
            <h1 className="title">{title}</h1>
            {collections}
            {(permissionToBoard) ? <CollectionCardEditable boardId={this.state.id}/> : null}
        </section>;
    }
}

export default BoardView;