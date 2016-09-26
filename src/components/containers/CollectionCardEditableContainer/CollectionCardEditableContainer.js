import React from 'react'
import { myFirebaseRef } from '../../../globals.js'

import { connect } from 'react-redux';
import Store from '../../../Store.js';

import CollectionCardEditable from '../../views/CollectionCardEditable/CollectionCardEditable.js';

class CollectionCardEditableContainer extends React.Component {
    add(e) {
        var form = e.target,
            elements = form.elements,
            title = elements.namedItem("title").value,
            description = elements.namedItem("description").value;
        var boardId = this.props.boardId;
        var toPush = {
            title: title,
            description: description,
            board: {}
        };
        toPush.board[boardId] = boardId;
        myFirebaseRef.child("collections").push(toPush).then((snapshot) => {
            form.reset();
            elements.item(0).focus();
        });
        e.preventDefault();
        return false;
    }
    
    render() {
        return (<CollectionCardEditable controllers={{add: this.add.bind(this)}}/>);
    }
}

const mapStateToProps = function(store) {
    return {
        permissions: store.permissions
    };
};

export default connect(mapStateToProps)(CollectionCardEditableContainer);
