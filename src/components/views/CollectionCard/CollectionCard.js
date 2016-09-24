import React from 'react'

import { Link } from 'react-router'
import ChatCard from '../../ChatCard/ChatCard.js'

// Using "Stateless Functional Components"
export default function(props) {
    var { id, boardId, title, description, permissionToBoard, controllers } = props;
    return (<div className="collectionCard card blue-grey darken-1">
                <div className="card-content white-text">
                    {(permissionToBoard) ? <span className="right card__editCont activator"><i className="material-icons">more_vert</i></span> : null}
                    <Link to={"/" + boardId + "/" + id}><div className="collectionCard__title card-title">{title}</div></Link>
                    <p className="collectionCard__description">{description}</p>
                    <ChatCard/>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">close</i></span>
                    <ul className="editOptions">
                        <li onClick={controllers.remove} className='pointer-icon'>Delete<i className="material-icons left">delete</i></li>
                    </ul>
                </div>
            </div>);
}