const initialState = {
	boards: [],
	loggedIn: false
};

const homeReducer = function(state = initialState, action) {
	switch(action.type) {
		case 'FETCH_BOARDS':
	        var boards = Object.keys(action.boards).map((elem) => {
                var newObj = action.boards[elem];
                newObj.id = newObj.key = elem;
                return newObj;
            });
			return Object.assign({}, state, { boards, loggedIn: action.loggedIn });
	}
	return state;
}

export default homeReducer;