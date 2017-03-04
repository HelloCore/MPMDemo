// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN'
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED'

export const LOGOUT = 'LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const login = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: LOGIN
      })
      //TODO: Login

      resolve();
    })
  }
}

export const actions = {
  login
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  userData: undefined,
  isLoading: false,
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN:

      break;
    case LOGOUT:

      break;

    default:
  }

  return state
}
