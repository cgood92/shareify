import React from 'react'
import { connect } from 'react-redux';
import { myFirebaseRef, user } from '../../../globals.js'
import Store from '../../../Store.js';

import CollectionView from '../../views/CollectionView/CollectionView.js';
import {fetchBoards} from '../HomeViewContainer/HomeViewContainer.js';

class CollectionViewContainer extends React.Component {

    havePermissions(board){
        return Object.keys(board).some((board) => {
            return this.props.permissions.boards[board];
        });
    }

    updateCollectionFromFB(snapshot) {
        var toDispatch = {
            type: 'UPDATE_COLLECTION',
            title: ''
        };
        if (snapshot.exists()) {
            var collection = snapshot.val();
            toDispatch.title = collection.title
            user().then((user) => {
                if (this.havePermissions.call(this, collection.board)) {
                    toDispatch.permissionToBoard = true;
                    Store.dispatch(toDispatch);
                } else {
                    if(!this.props.permissions.boards.fetched) {
                        fetchBoards(user.uid, (snapshot) => {
                            var result = snapshot.val();
                            if (this.havePermissions.call(this, result)) {
                                toDispatch.permissionToBoard = true;
                                Store.dispatch(toDispatch);
                            } else {
                                Store.dispatch(toDispatch);
                            }
                        });
                    } else {
                        Store.dispatch(toDispatch);
                    }
                }
            }).catch((e) => {
                Store.dispatch(toDispatch);
            });
        }
        Store.dispatch(toDispatch);
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
        const id = this.props.params.collectionId;
        return (<CollectionView {...this.props.collection} id={id}/>);
    }
}

const mapStateToProps = function(store) {
    return {
        collection: store.collectionState,
        permissions: store.permissions
    };
};

export default connect(mapStateToProps)(CollectionViewContainer);
