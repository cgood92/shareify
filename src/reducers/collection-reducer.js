const initialState = {
	collections: {},
	map: {},
	current: null
};

export default function(oldState = initialState, action) {
	var state = Object.assign({}, oldState);
	switch(action.type) {
		case 'FETCH_COLLECTION':
			state.collections = Object.assign({}, state.collections, action.collections);
			state.map[action.current] = {};
			for (var i in action.collections) {
				state.map[action.current][i] = i;
			}
			return state;
		case 'UPDATE_COLLECTION':
			return Object.assign({}, state, { current: action.current });
	}
	return state;
};