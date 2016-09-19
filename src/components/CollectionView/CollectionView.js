import React from 'react'
import { userId, myFirebaseRef } from '../../globals.js'

import ResourceCard from '../ResourceCard/ResourceCard.js'
import ResourceCardEditable from '../ResourceCardEditable/ResourceCardEditable.js'

class CollectionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Title coming soon...',
            resources: [],
            id: this.props.params.collectionId
        };
    }

    updateCollectionFromFB(snapshot) {
        if (snapshot.exists()) {
            var collection = snapshot.val();
            this.state.title = collection.title;
            this.setState(this.state);
        }
    }

    updateResourcesFromFB(snapshot) {
        if (snapshot.exists()) {
            var collection = snapshot.val();
            this.state.resources = Object.keys(collection).map(function(i){
                return collection[i];
            });
            this.setState(this.state);
        }
    }

    componentDidMount() {
        myFirebaseRef.child("resources").orderByChild('collection/' + this.state.id).equalTo(this.state.id).on("value", this.updateResourcesFromFB.bind(this));
        myFirebaseRef.child("collections/" + this.state.id).on("value", this.updateCollectionFromFB.bind(this));
    }

    componentWillUnmount() {
        myFirebaseRef.child("resources").orderByChild('collection/' + this.state.id).equalTo(this.state.id).off("value", this.updateResourcesFromFB.bind(this));
        myFirebaseRef.child("collections/" + this.state.id).off("value", this.updateCollectionFromFB.bind(this));
    }

    render() {
        var { id, title, resources, collectionId } = this.state;
        var resources = resources.map(function(elem, index){
            return <ResourceCard href={elem.href} key={index}/>;
        });
        return <section className="resourcesView">
            <ul className="collection with-header">
                <li className="collection-header"><h4>{title}</h4></li>
                {resources}
                <ResourceCardEditable collectionId={id}/>
            </ul>
        </section>;
    }
}

export default CollectionView;