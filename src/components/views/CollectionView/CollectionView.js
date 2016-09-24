import React from 'react';

import ResourceCardContainer from '../../containers/ResourceCardContainer/ResourceCardContainer.js'
import ResourceCardEditable from '../../ResourceCardEditable/ResourceCardEditable.js'

// Using "Stateless Functional Components"
export default function(props) {
    var { id, title, resources, permissionToBoard } = props;
    var resources = resources.map(function(elem, index){
        return <ResourceCardContainer href={elem.href} key={elem.key} id={elem.key} collectionId={id} permissionToBoard={permissionToBoard} />;
    });
    return (<section className="resourcesView">
        <ul className="collection with-header">
            <li className="collection-header"><h4>{title}</h4></li>
            {resources}
            {(permissionToBoard) ? <ResourceCardEditable collectionId={id}/> : null}
        </ul>
    </section>);
}