// ------------------------------------
// Constants
// ------------------------------------

export const TOGGLE_WEEKEND = 'TOGGLE_WEEKEND'


// ------------------------------------
// Actions
// ------------------------------------
const getDefaultMonth = () => {
  var month = Moment({hour: 0, minute: 0, seconds: 0, milliseconds: 0});
  if(month.date() >= 26){
    month = month.add(1, 'months').date(26);
  }else{
    month = month.date(26);
  }
  return month;
}

export function toggleWeekend() {
  return {
    type: TOGGLE_WEEKEND,
  }
}

export const actions = {
  toggleWeekend,
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  isShowWeekEnd: false,
}


export default function calendarConfigReducer(state = initialState, action) {
  switch (action.type) {

    case TOGGLE_WEEKEND:
      return {
        ...state,
        isShowWeekEnd: !state.isShowWeekEnd,
      }

    default:
  }

  return state
}
