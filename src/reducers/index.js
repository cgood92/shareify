import { combineReducers } from 'redux';

// Reducers
import collectionReducer from './collection-reducer';
import boardReducer from './board-reducer';
import userReducer from './user-reducer';
import resourceReducer from './resource-reducer';

// Combine Reducers
var reducers = combineReducers({
	boards: boardReducer,
	collections: collectionReducer,
	resources: resourceReducer,
	user: userReducer
});

export default reducers;