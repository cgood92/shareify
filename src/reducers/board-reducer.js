const initialState = {
	boards: {},
	current: null
};

export default function(oldState = initialState, action) {
	var state = Object.assign({}, oldState);
	switch(action.type) {
		case 'FETCH_OTHER_BOARD':
			state.boards = Object.assign({}, state.boards, action.boards);
			if (action.current) {
				state.current = action.current;
			}
			return Object.assign({}, state);
		case 'FETCH_OWNED_BOARDS':
			var confBoards = {};
			for (var i in action.boards) {
				confBoards[i] = action.boards[i];
				confBoards[i].permissionToBoard = true;
			}
			state.boards = confBoards;
			return state;
		case 'UPDATE_BOARD':
			return Object.assign({}, state, { current: action.current });
	}
	return state;
};