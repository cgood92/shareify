const initialState = {
	id: null,
	href: null,
	permissionToBoard: false
};

const resourceReducer = function(state = initialState, action) {
	switch(action.type) {
		case 'UPDATE_RESOURCE':
			return Object.assign({}, state);
	}
	return state;
}

export default resourceReducer;