const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const updatedState = {
        user: action.payload
      };
      return updatedState;
    }

    case 'LOGOUT': {
      const updatedState = {
        user: null
      };
      return updatedState;
    }

    default: {
      return state;
    }
  }
}

export default authReducer;
