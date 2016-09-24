const initialState = {
    collections: [],
    id: null,
    title: '',
    permissionToBoard: false
};

const boardReducer = function(state = initialState, action) {
	switch(action.type) {
		case 'FETCH_BOARD':
			return Object.assign({}, state, action);
		case 'UPDATE_BOARD':
			return Object.assign({}, state, action);
	}
	return state;
}

export default boardReducer;