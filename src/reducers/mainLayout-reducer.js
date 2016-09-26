const initialState = {
  board: {},
  collection: {},
  loggedIn: false
};

const mainLayoutReducer = function(state = initialState, action) {
	switch(action.type) {
		case 'UPDATE_BOARD':
			return Object.assign({}, state, {board: { title: action.title}});
		case 'UPDATE_COLLECTION':
			return Object.assign({}, state, {collection: { title: action.title}});
		case 'UPDATE_LOGIN':
			return Object.assign({}, state, action);
	}
	return state;
}

export default mainLayoutReducer;