import React from 'react'
import { userId, myFirebaseRef } from '../../globals.js'

import CollectionCard from '../CollectionCard/CollectionCard.js'
import CollectionCardEditable from '../CollectionCardEditable/CollectionCardEditable.js'

class BoardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: [],
            id: this.props.params.boardId
        };
    }

    updateFromFB(snapshot) {
        if (snapshot.exists()){
            this.state = {
                collections: Object.keys(snapshot.val()),
                id: this.state.id
            };
            this.setState(this.state);
        } else {
            this.state.collections = [];
            this.setState(this.state);
        }
    }

    componentDidMount() {
        var boardId = this.props.params.boardId;
        myFirebaseRef.child("collections").orderByChild("board/" + boardId).equalTo(boardId).on("value", this.updateFromFB.bind(this));
    }

    componentWillUnmount() {
        var boardId = this.props.params.boardId;
        myFirebaseRef.child("collections").orderByChild("board/" + boardId).equalTo(boardId).off("value", this.updateFromFB.bind(this));
    }

    render() {
        var collections = this.state.collections.map((collection, index) => {
            return <CollectionCard boardId={this.state.id} id={collection} key={index}/>;
        });
        return <section className="collectionRow">
            <h1 className="title">{this.state.id}</h1>
            {collections}
            <CollectionCardEditable boardId={this.state.id}/>
        </section>;
    }
}

export default BoardView;