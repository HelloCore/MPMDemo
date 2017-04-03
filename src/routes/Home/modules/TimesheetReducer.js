// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_TIMESHEET = 'FETCH_TIMESHEET'
export const FETCH_TIMESHEET_COMPLETED = 'FFETCH_TIMESHEET_COMPLETED'


export const SYNC_TIMESHEET = 'SYNC_TIMESHEET'
export const SYNC_PROJECT = 'SYNC_PROJECT'


// ------------------------------------
// Actions
// ------------------------------------


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const fetchTimesheet = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: FETCH_TIMESHEET
      })
      //TODO: FETCH Timesheet

      resolve();
    })
  }
}

export const actions = {
  fetchTimesheet
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  timesheetList: {},
  customerData: [],
  isLoading: false,
}

export default function timesheetReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_TIMESHEET:

      break;
    case FETCH_TIMESHEET_COMPLETED:

      break;

    default:
  }

  return state
}
