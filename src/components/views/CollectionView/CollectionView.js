import React from 'react';

import ResourceCardContainer from '../../containers/ResourceCardContainer/ResourceCardContainer.js'
import ResourceCardEditableContainer from '../../containers/ResourceCardEditableContainer/ResourceCardEditableContainer.js'

// Using "Stateless Functional Components"
export default function(props) {
    var { collection } = props;
    var resources = [];
    if (collection.resources) {
        resources = collection.resources.map(function(elem, index){
            return <ResourceCardContainer href={elem.href} key={index} id={elem.id} collectionId={collection.id} permissionToBoard={collection.permissionToBoard} />;
        });
    }
    return (<section className="resourcesView">
        <ul className="collection with-header">
            <li className="collection-header"><h4>{collection.title}</h4></li>
            {resources}
            {(collection.permissionToBoard) ? <ResourceCardEditableContainer collectionId={collection.id}/> : null}
        </ul>
    </section>);
}