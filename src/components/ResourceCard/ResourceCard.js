import React from 'react'
import { userId, myFirebaseRef } from '../../globals.js'

class ResourceCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            href: this.props.href,
            chat: {}
        };
    }
    render() {
        var { href } = this.state;
        return <li className="collection-item"><a href={href}><div>{href}<span className="secondary-content"><i className="material-icons">send</i></span></div></a></li>;
    }
}

export default ResourceCard;