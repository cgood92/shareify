const initialState = {
	title: '',
	resources: [],
	id: null,
	permissionToBoard: false
};

const collectionReducer = function(state = initialState, action) {
	switch(action.type) {
		case 'UPDATE_COLLECTION':
			return Object.assign({}, state, action);
		case 'FETCH_RESOURCES':
			return Object.assign({}, state, action);
	}
	return state;
}

export default collectionReducer;