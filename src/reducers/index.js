import { combineReducers } from 'redux';

// Reducers
import resourceReducer from './resource-reducer';
import collectionReducer from './collection-reducer';
import boardReducer from './board-reducer';
import homeReducer from './home-reducer';
import permissionsReducer from './permissions-reducer';

// Combine Reducers
var reducers = combineReducers({
    resourceState: resourceReducer,
    collectionState: collectionReducer,
    boardState: boardReducer,
    homeState: homeReducer,
    permissions: permissionsReducer
});

export default reducers;