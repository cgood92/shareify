import React from 'react'
import { myFirebaseRef, user } from '../../globals.js'

class ResourceCardEditable extends React.Component {
    constructor(props) {
        super(props);
        var { collectionId } = this.props;
        this.state = {
            collectionId: collectionId
        };
    }
    
    add(e) {
        var form = e.target,
            elements = form.elements,
            href = elements.namedItem("link").value,
            collectionId = this.state.collectionId;
        user().then(function(user){
            var toPush = {
                href: href,
                collection: {},
                user: user.uid
            };
            toPush.collection[collectionId] = collectionId;
            myFirebaseRef.child("resources").push(toPush).then((snapshot) => {
                form.reset();
            });
        });
        e.preventDefault();
        return false;
    }
    
    render() {
        return <li className="collection-item">
            <form onSubmit={this.add.bind(this)}>
                <input placeholder="Link" id="collection_link" type="text" name="link"></input>
            </form>
        </li>;
    }
}

export default ResourceCardEditable;