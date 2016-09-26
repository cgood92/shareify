const initialState = {
  board: {},
  collection: {},
  loggedIn: false
};

const mainLayoutReducer = function(state = initialState, action) {
	switch(action.type) {
		case 'UPDATE_BOARD':
			var newState = Object.assign({}, state);
			if (action.title) {
				newState.board.title = action.title;
			}
			if (action.id) {
				newState.board.id = action.id;
			}
			return newState;
		case 'UPDATE_COLLECTION':
			var newState = Object.assign({}, state);
			if (action.title) {
				newState.collection.title = action.title;
			}
			if (action.id) {
				newState.collection.id = action.id;
			}
			return newState;
		case 'UPDATE_LOGIN':
			return Object.assign({}, state, action);
	}
	return state;
}

export default mainLayoutReducer;