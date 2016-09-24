import React from 'react'
import { connect } from 'react-redux';
import { myFirebaseRef } from '../../../globals.js'

import ResourceCard from '../../views/ResourceCard/ResourceCard.js'

class ResourceCardContainer extends React.Component {

    componentDidMount() {

    }

    remove() {
        if (this.state.permissionToBoard) {
            myFirebaseRef.child("resources/" + this.state.id + "/collection/" + this.state.collectionId).remove(function(){
            });
        }
    }

    render() {
        return (<ResourceCard permissionToBoard={this.props.permissionToBoard} href={this.props.href}/>);
    }

}

const mapStateToProps = function(store) {
    return {
        resource: store.resourceState
    };
};

export default connect(mapStateToProps)(ResourceCardContainer);
