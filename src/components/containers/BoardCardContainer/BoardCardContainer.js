import React from 'react'

import { connect } from 'react-redux';
import { myFirebaseRef, user } from '../../../globals.js'
import Store from '../../../Store.js';

import BoardCard from '../../views/BoardCard/BoardCard.js';

class BoardCardContainer extends React.Component {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    remove(e) {
        // Remove board from DB
        myFirebaseRef.child("boards/" + this.props.id).remove(function(){
        });
    }

    render() {
        return (<BoardCard {...this.props} controllers={{
            remove: this.remove.bind(this)
        }}/>);
    }
}

const mapStateToProps = function(store) {
    return {
        board: store.boardState
    };
};

export default connect(mapStateToProps)(BoardCardContainer);
