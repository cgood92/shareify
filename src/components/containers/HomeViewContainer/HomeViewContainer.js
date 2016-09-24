import React from 'react'
import { myFirebaseRef, myFirebaseAuth, user } from '../../../globals.js'
import { connect } from 'react-redux';
import Store from '../../../Store.js';

import HomeView from '../../views/HomeView/HomeView.js';

class HomeViewContainer extends React.Component {
    
    updateFromFB(snapshot) {
        var toDispatch = {
            type: 'FETCH_BOARDS',
            boards: [],
            loggedIn: true
        };
        if (snapshot.exists()) {
            var result = snapshot.val();
            var boards = Object.keys(result).map((elem) => {
                var newObj = result[elem];
                newObj.id = newObj.key = elem;
                return newObj;
            });
            toDispatch.boards = boards;
            Store.dispatch(toDispatch);
        } else {
            Store.dispatch(toDispatch);
        }
    }

    componentDidMount() {
        user().then((user) => {
            myFirebaseRef.child("boards").orderByChild("user/" + user.uid).equalTo(user.uid).on("value", this.updateFromFB.bind(this));
        }).catch(() => {
            Store.dispatch({
                type: 'FETCH_BOARDS',
                boards: [],
                loggedIn: false
            });
        });
    }

    componentWillUnmount() {
        user().then((user) => {
            myFirebaseRef.child("boards").orderByChild("user").equalTo(user.uid).off("value", this.updateFromFB.bind(this));
        });
    }

    render() {
        return (<HomeView {...this.props.home}/>);
    }
}

const mapStateToProps = function(store) {
    return {
        home: store.homeState
    };
};

export default connect(mapStateToProps)(HomeViewContainer);
