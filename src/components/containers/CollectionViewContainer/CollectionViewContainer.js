import React from 'react'
import { connect } from 'react-redux';
import { myFirebaseRef, user } from '../../../globals.js'
import Store from '../../../Store.js';

import CollectionView from '../../views/CollectionView/CollectionView.js';

class CollectionViewContainer extends React.Component {

    updateCollectionFromFB(snapshot) {
        if (snapshot.exists()) {
            var collection = snapshot.val();
            Store.dispatch({
                type: 'UPDATE_COLLECTION',
                title: collection.title
            });
        }
    }

    updateResourcesFromFB(snapshot) {
        if (snapshot.exists()) {
            var collection = snapshot.val(),
                resources = Object.keys(collection).map(function(i){
                    var obj = collection[i];
                    obj.key = i;
                    return obj;
                });
            Store.dispatch({
                type: 'FETCH_RESOURCES',
                resources
            });
        } else {
            Store.dispatch({
                type: 'FETCH_RESOURCES',
                resources: []
            });
        }
    }

    componentDidMount() {
        const id = this.props.params.collectionId;
        myFirebaseRef.child("resources").orderByChild('collection/' + id).equalTo(id).on("value", this.updateResourcesFromFB.bind(this));
        myFirebaseRef.child("collections/" + id).on("value", this.updateCollectionFromFB.bind(this));
    }

    componentWillUnmount() {
        const id = this.props.params.collectionId;
        myFirebaseRef.child("resources").orderByChild('collection/' + id).equalTo(id).off("value", this.updateResourcesFromFB.bind(this));
        myFirebaseRef.child("collections/" + id).off("value", this.updateCollectionFromFB.bind(this));
    }

    render() {
        return (<CollectionView {...this.props.collection}/>);
    }
}

const mapStateToProps = function(store) {
    return {
        collection: store.collectionState
    };
};

export default connect(mapStateToProps)(CollectionViewContainer);
