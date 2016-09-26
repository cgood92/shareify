import React from 'react'

// Using "Stateless Functional Components"
export default function(props) {
    const { controllers } = props;
    return (
        <li className="collection-item">
            <form onSubmit={controllers.add}>
                <input placeholder="Link" id="collection_link" type="text" name="link"></input>
            </form>
        </li>
    );
}
