import React from 'react'
import { userId, myFirebaseRef } from '../../globals.js'

class ResourceCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            href: this.props.href,
            chat: {},
            id: this.props.id,
            collectionId: this.props.collectionId
        };
    }

    remove() {
        // Remove board from DB
        myFirebaseRef.child("resources/" + this.state.id + "/collection/" + this.state.collectionId).remove(function(){
        });
    }

    render() {
        var { href, id } = this.state;
        return <li className="collection-item">
        <a href={href}>{href}</a>
          <div className="fixed-action-btn horizontal">
            <a className="btn-floating">
              <i className="material-icons">more_vert</i>
            </a>
            <ul className="fab-small">
              <li><a className="btn-floating red" onClick={this.remove.bind(this)}><i className="material-icons">delete</i></a></li>
            </ul>
          </div>
        </li>;
    }
}

export default ResourceCard;