import React from 'react';

import CollectionCard from '../../CollectionCard/CollectionCard.js'
import CollectionCardEditable from '../../CollectionCardEditable/CollectionCardEditable.js'

// Using "Stateless Functional Components"
export default function(props) {
    var { id, title, collections = [], permissionToBoard } = props;
    collections = collections.map((collection, index) => {
        return <CollectionCard boardId={id} id={collection} key={index} permissionToBoard={permissionToBoard}/>;
    });
    return (<section className="collectionRow">
        <h1 className="title">{title}</h1>
        {collections}
        {(permissionToBoard) ? <CollectionCardEditable boardId={this.state.id}/> : null}
    </section>);
}