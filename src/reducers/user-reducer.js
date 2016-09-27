const initialState = {
	loggedIn: false
};

export default function(oldState = initialState, action) {
	var state = Object.assign({}, oldState);
	switch(action.type) {
		case 'UPDATE_USER':
			return Object.assign({}, state, action);
	}
	return state;
};