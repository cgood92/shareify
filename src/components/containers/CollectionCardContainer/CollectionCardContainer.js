import React from 'react'
import { myFirebaseRef } from '../../../globals.js'

import CollectionCard from '../../views/CollectionCard/CollectionCard.js';

class CollectionCardContainer extends React.Component {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    remove(e) {
        var { permissionToBoard, id } = this.props;
        if (permissionToBoard) {
            myFirebaseRef.child("collections/" + id).remove(function(){
            });
        }
    }

    render() {
        return (<CollectionCard {...this.props} controllers={{
            remove: this.remove.bind(this)
        }}/>);
    }
}

export default CollectionCardContainer;