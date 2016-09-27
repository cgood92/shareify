import React from 'react';

import CollectionCardContainer from '../../containers/CollectionCardContainer/CollectionCardContainer.js'
import CollectionCardEditableContainer from '../../containers/CollectionCardEditableContainer/CollectionCardEditableContainer.js'

// Using "Stateless Functional Components"
export default function(props) {
    var { board } = props;
    var collections = [];
    if (board.collections) {
	    collections = board.collections.map((collection, index) => {
	        return <CollectionCardContainer boardId={board.id} id={collection.id} key={index} permissionToBoard={board.permissionToBoard} title={collection.title} description={collection.description}/>;
	    });
    }
    return (<section className="collectionRow">
        <h1 className="title">{board.title}</h1>
        {collections}
        {(board.permissionToBoard) ? <CollectionCardEditableContainer boardId={board.id}/> : null}
    </section>);
}