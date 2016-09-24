import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
    const { href, permissionToBoard } = props;
    return (<li className="collection-item">
    <a href={href} target="_BLANK">{href}</a>
    {(permissionToBoard) ? 
      <div className="fixed-action-btn horizontal">
        <a className="btn-floating blue-grey">
          <i className="material-icons">more_vert</i>
        </a>
        <ul className="fab-small">
          <li><a className="btn-floating red"><i className="material-icons">delete</i></a></li>
        </ul>
      </div>
      : null
    }
    </li>);
}