const initialState = {
	boards: { fetched: false }
};

const permissionsReducer = function(state = initialState, action) {
	switch(action.type) {
		case 'FETCH_BOARDS':
			var boards = { fetched: true };
			for (var i in action.boards) {
				boards[i] = true;
			}
			return Object.assign({}, state, { boards });
		case 'UPDATE_BOARD':
			return Object.assign({}, state, { boards: { [action.id]: true } });
		case 'UPDATE_COLLECTION':
			return Object.assign({}, state, {});
	}
	return state;
}

export default permissionsReducer;