const initialState = {
	boards: [],
	loggedIn: false
};

const homeReducer = function(state = initialState, action) {
	switch(action.type) {
		case 'FETCH_BOARDS':
			return Object.assign({}, state, action);
	}
	return state;
}

export default homeReducer;