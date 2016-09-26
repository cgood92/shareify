import React from 'react'
import { myFirebaseRef, user } from '../../../globals.js'

import { connect } from 'react-redux';

import ResourceCardEditable from '../../views/ResourceCardEditable/ResourceCardEditable.js';

class ResourceCardEditableContainer extends React.Component {

    add(e) {
        var form = e.target,
            elements = form.elements,
            href = elements.namedItem("link").value,
            collectionId = this.props.collectionId;
        user().then(function(user){
            var toPush = {
                href: href,
                collection: {
                    [collectionId]: collectionId
                },
                user: user.uid,
            };
            myFirebaseRef.child("resources").push(toPush).then((snapshot) => {
                form.reset();
            });
        });
        e.preventDefault();
        return false;
    }
    
    render() {
        return (<ResourceCardEditable controllers={{add: this.add.bind(this)}}/>);
    }
}

const mapStateToProps = function(store) {
    return {
    };
};

export default connect(mapStateToProps)(ResourceCardEditableContainer);
