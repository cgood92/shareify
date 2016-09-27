const initialState = {
	resources: {},
	map: {}
};

export default function(oldState = initialState, action) {
	var state = Object.assign({}, oldState);
	switch(action.type) {
		case 'FETCH_RESOURCES':
			state.resources = Object.assign({}, state.resources, action.resources);
			state.map[action.collectionId] = {};
			for (var i in action.resources) {
				state.map[action.collectionId][i] = i;
			}
			return state;
	}
	return state;
};