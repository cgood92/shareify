import { Router, Route, Link, hashHistory } from 'react-router'

import BoardViewContainer from './components/containers/BoardViewContainer/BoardViewContainer.js'
import CollectionViewContainer from './components/containers/CollectionViewContainer/CollectionViewContainer.js'
import HomeViewContainer from './components/containers/HomeViewContainer/HomeViewContainer.js'
import MainLayoutContainer from './components/containers/MainLayoutContainer/MainLayoutContainer.js'
import LoginViewContainer from './components/containers/LoginViewContainer/LoginViewContainer.js'

export default (
    <Router history={hashHistory}>
        <Route component={MainLayoutContainer}>
            <Route path="/login" component={LoginViewContainer} />
            <Route path="/:boardId/:collectionId" component={CollectionViewContainer} />
            <Route path="/:boardId" component={BoardViewContainer} />
            <Route path="/" component={HomeViewContainer} />
        </Route>
    </Router>
);
