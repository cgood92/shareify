import React from 'react';

import CollectionCardContainer from '../../containers/CollectionCardContainer/CollectionCardContainer.js'
import CollectionCardEditable from '../../CollectionCardEditable/CollectionCardEditable.js'

// Using "Stateless Functional Components"
export default function(props) {
    var { id, title, collections = [], permissionToBoard } = props;
    collections = collections.map((collection, index) => {
        return <CollectionCardContainer boardId={id} id={collection.id} key={index} permissionToBoard={permissionToBoard} title={collection.title} description={collection.description}/>;
    });
    return (<section className="collectionRow">
        <h1 className="title">{title}</h1>
        {collections}
        {(permissionToBoard) ? <CollectionCardEditable boardId={this.state.id}/> : null}
    </section>);
}