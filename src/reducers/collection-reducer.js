const initialState = {
	collections: {},
	map: {},
	current: null
};

export default function(oldState = initialState, action) {
	var state = Object.assign({}, oldState);
	switch(action.type) {
		case 'FETCH_COLLECTIONS':
			state.collections = Object.assign({}, state.collections, action.collections);
			state.map[action.boardId] = {};
			for (var i in action.collections) {
				state.map[action.boardId][i] = i;
			}
			return state;
	}
	return state;
};