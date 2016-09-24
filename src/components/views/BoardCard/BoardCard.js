import React from 'react';

import ChatCard from '../../ChatCard/ChatCard.js'
import { Link } from 'react-router'

// Using "Stateless Functional Components"
export default function(props) {
    var { id, title, description } = props;
    return (<div className="boardCard card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="right card__editCont activator"><i className="material-icons">more_vert</i></span>
                    <Link to={"/" + id}><div className="boardCard__title card-title">{title}</div></Link>
                    <p className="boardCard__description">{description}</p>
                    <ChatCard/>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">close</i></span>
                    <ul className="editOptions">
                        <li>Delete<i className="material-icons left">close</i></li>
                    </ul>
                </div>
            </div>);
}