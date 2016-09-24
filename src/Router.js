import { Router, Route, Link, hashHistory } from 'react-router'

import BoardViewContainer from './components/containers/BoardViewContainer/BoardViewContainer.js'
import CollectionViewContainer from './components/containers/CollectionViewContainer/CollectionViewContainer.js'
import HomeViewContainer from './components/containers/HomeViewContainer/HomeViewContainer.js'
import MainLayout from './components/MainLayout/MainLayout.js'
import LoginView from './components/LoginView/LoginView.js'

export default (
    <Router history={hashHistory}>
        <Route component={MainLayout}>
            <Route path="/login" component={LoginView} />
            <Route path="/:boardId/:collectionId" component={CollectionViewContainer} />
            <Route path="/:boardId" component={BoardViewContainer} />
            <Route path="/" component={HomeViewContainer} />
        </Route>
    </Router>
);
