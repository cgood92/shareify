import React from 'react'
import { myFirebaseRef, user } from '../../globals.js'

import ResourceCard from '../ResourceCard/ResourceCard.js'
import ResourceCardEditable from '../ResourceCardEditable/ResourceCardEditable.js'

class CollectionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Title coming soon...',
            resources: [],
            id: this.props.params.collectionId,
            permissionToBoard: false
        };
    }

    updateCollectionFromFB(snapshot) {
        if (snapshot.exists()) {
            var collection = snapshot.val();
            if (!this.state.permissionToBoard) {
                user().then((user) => {
                    for (var i in collection.board) {
                        myFirebaseRef.child('boards/' + i + '/user/' + user.uid).on("value", (snapshot) => {
                            if (snapshot.exists()) {
                                this.state.permissionToBoard = true;
                                this.setState(this.state);
                            }
                        });
                    }
                }).catch(() => {});
            }
            this.state.title = collection.title;
            this.setState(this.state);
        }
    }

    updateResourcesFromFB(snapshot) {
        if (snapshot.exists()) {
            var collection = snapshot.val();
            this.state.resources = Object.keys(collection).map(function(i){
                var obj = collection[i];
                obj.key = i;
                return obj;
            });
            this.setState(this.state);
        } else {
            this.state.resources = [];
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
        var { id, title, resources, permissionToBoard } = this.state;
        var resources = resources.map(function(elem, index){
            return <ResourceCard href={elem.href} key={elem.key} id={elem.key} collectionId={id} permissionToBoard={permissionToBoard} />;
        });
        return <section className="resourcesView">
            <ul className="collection with-header">
                <li className="collection-header"><h4>{title}</h4></li>
                {resources}
                {(permissionToBoard) ? <ResourceCardEditable collectionId={id}/> : null}
            </ul>
        </section>;
    }
}

export default CollectionView;