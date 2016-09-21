import { Router, Route, Link, hashHistory } from 'react-router'
import React from 'react'
import { render } from 'react-dom'

import BoardView from './components/BoardView/BoardView.js'
import CollectionView from './components/CollectionView/CollectionView.js'
import HomeView from './components/HomeView/HomeView.js'
import MainLayout from './components/MainLayout/MainLayout.js'
import LoginView from './components/LoginView/LoginView.js'

$(document).ready(function() {
    // Initialize router
    render(
        <Router history={hashHistory}>
            <Route component={MainLayout}>
                <Route path="/login" component={LoginView} />
                <Route path="/:boardId/:collectionId" component={CollectionView} />
                <Route path="/:boardId" component={BoardView} />
                <Route path="/" component={HomeView} />
            </Route>
        </Router>
  , document.getElementById('app'), function() {
        // Callback to render
    });
});

