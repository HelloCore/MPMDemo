import {REHYDRATE} from 'redux-persist/constants'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'

export const LOGOUT = 'LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const login = (credential) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: LOGIN
      })
      //TODO: Login
      //credential.username
      //credential.password

      setTimeout(() => {
        dispatch({
          type    : LOGIN_FAILED,
          payload : {
            message: 'ERROR'
          }
        })
        resolve()
      }, 1000)
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

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case LOGOUT:
      break;

    case REHYDRATE:
      return {
        userData: state.userData,
      }

    default:
  }

  return state
}
