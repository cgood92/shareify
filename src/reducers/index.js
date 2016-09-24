import { combineReducers } from 'redux';

// Reducers
import resourceReducer from './resource-reducer';
import collectionReducer from './collection-reducer';
import boardReducer from './board-reducer';

// Combine Reducers
var reducers = combineReducers({
    resourceState: resourceReducer,
    collectionState: collectionReducer,
    boardState: boardReducer
});

export default reducers;