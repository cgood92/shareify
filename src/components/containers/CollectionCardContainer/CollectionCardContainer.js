import React from 'react'
import { myFirebaseRef } from '../../../globals.js'

import CollectionCard from '../../views/CollectionCard/CollectionCard.js';

class CollectionCardContainer extends React.Component {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    remove(e) {
        var { permissionToBoard, id } = this.state;
        if (permissionToBoard) {
            myFirebaseRef.child("collections").child(id).remove(function(){
            });
        }
    }

    render() {
        return (<CollectionCard {...this.props}/>);
    }
}

export default CollectionCardContainer;