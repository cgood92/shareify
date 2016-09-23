const initialState = {
};

const userReducer = function(state = initialState, action) {

  switch(action.type) {
    case 0:
      return Object.assign({}, state, { users: 'hi' });
  }

  return state;

}

export default userReducer;