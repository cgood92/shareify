import React from 'react'
import { connect } from 'react-redux';
import { myFirebaseRef, user } from '../../../globals.js'
import Store from '../../../Store.js';

import CollectionView from '../../views/CollectionView/CollectionView.js';

class CollectionViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // For the collection 
        var collectionId = this.props.params.collectionId,
            boardId = this.props.params.boardId,
            collection = this.props.collections.collections[collectionId]; 
        this.props.collections.current = collectionId;
        if (collection) {
            collection.id = collectionId;
            this.state = collection;
        } else {
            myFirebaseRef.child("collections/" + collectionId).on("value", (snapshot) => {
                if (snapshot.exists()) {
                    var collection = snapshot.val();
                    Store.dispatch({
                        type: 'FETCH_COLLECTION',
                        collections: { [collectionId]: collection },
                        current: collectionId
                    });
                    collection.id = collectionId;
                    this.state = Object.assign({}, this.state, collection);
                }
            });
        }

        Store.dispatch({
            type: 'UPDATE_COLLECTION',
            current: collectionId
        });
        Store.dispatch({
            type: 'UPDATE_BOARD',
            current: boardId
        });

        // For the resources 
        var resources = [];
        var map = this.props.resources.map[collectionId];
        // Already been fetched
        if (map) {
            for (var i in map) {
                resources.push(this.props.resources.resources[i]);
            }
            this.state.resources = resources;
        } else {
            myFirebaseRef.child("resources").orderByChild('collection/' + collectionId).equalTo(collectionId).on("value", (snapshot) => {
                var resources = {};
                if (snapshot.exists()) {
                    resources = snapshot.val();
                    this.state.resources = Object.keys(resources).map((i) => {
                        var resource = resources[i];
                        resource.id = i;
                        return resource;
                    });
                    Store.dispatch({
                        type: 'FETCH_RESOURCES',
                        resources,
                        collectionId 
                    });
                } else {
                    this.setState(Object.assign(this.state, {resources: []}));
                }
            });
        }
    }

    componentWillUnmount() {
    }

    render() {
        this.state.permissionToBoard = this.props.boards.boards[this.props.params.boardId].permissionToBoard;
        return (<CollectionView collection={this.state}/>);
    }
}

const mapStateToProps = function(store) {
    return store;
};

export default connect(mapStateToProps)(CollectionViewContainer);
