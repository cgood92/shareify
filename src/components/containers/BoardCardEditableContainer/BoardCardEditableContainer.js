import React from 'react'
import { myFirebaseRef, user } from '../../../globals.js'

import BoardCardEditable from '../../views/BoardCardEditable/BoardCardEditable.js';

class BoardCardEditableContainer extends React.Component {
    
    add(e) {
        var form = e.target,
            elements = form.elements,
            title = elements.namedItem("title").value,
            description = elements.namedItem("description").value;
        user().then((user) => {
            var toPush = {
                title: title,
                description: description,
                user: {}
            };
            toPush.user[user.uid] = user.uid;
            myFirebaseRef.child("boards").push(toPush).then((snapshot) => {
                form.reset();
                elements.item(0).focus();
            });
        });
        e.preventDefault();
        return false;
    }
    
    render() {
        return (<BoardCardEditable controllers={{add: this.add.bind(this)}}/>);
    }
}

export default BoardCardEditableContainer;