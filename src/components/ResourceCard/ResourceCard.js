import React from 'react'
import { myFirebaseRef } from '../../globals.js'

class ResourceCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            href: this.props.href,
            chat: {},
            id: this.props.id,
            collectionId: this.props.collectionId,
            permissionToBoard: this.props.permissionToBoard
        };
    }

    componentWillReceiveProps(nextProps) {
        this.state.permissionToBoard = nextProps.permissionToBoard;
    }

    remove() {
        if (this.state.permissionToBoard) {
            myFirebaseRef.child("resources/" + this.state.id + "/collection/" + this.state.collectionId).remove(function(){
            });
        }
    }

    render() {
        var { href, id, permissionToBoard } = this.state;
        return <li className="collection-item">
        <a href={href} target="_BLANK">{href}</a>
        {(permissionToBoard) ? 
          <div className="fixed-action-btn horizontal">
            <a className="btn-floating blue-grey">
              <i className="material-icons">more_vert</i>
            </a>
            <ul className="fab-small">
              <li><a className="btn-floating red" onClick={this.remove.bind(this)}><i className="material-icons">delete</i></a></li>
            </ul>
          </div>
          : null
        }
        </li>;
    }
}

export default ResourceCard;