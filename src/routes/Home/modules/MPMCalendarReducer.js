import Moment from 'moment'
// ------------------------------------
// Constants
// ------------------------------------
export const INITIAL_CALENDAR = 'INITIAL_CALENDAR'
export const CHANGE_CALENDAR_MONTH = 'CHANGE_CALENDAR_MONTH'

// ------------------------------------
// Actions
// ------------------------------------


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const initialCalendar = () => {
  return (dispatch, getState) => {
    const today = Moment();
    const month = ((Moment().date() >= 25)? Moment().add(1, 'months').month(): Moment().month()) + 1;
    dispatch({
      today,
      month,
      type: INITIAL_CALENDAR,
    })

    changeCalendarMonth(month)(dispatch, getState);
  }
}

export const changeCalendarMonth = (month) => {
  return (dispatch, getState) => {
    var today = getState().MPMCalendarReducer.today;

    if(today === undefined){
      today = Moment();
    }

    const startDate = Moment(month, 'M').date(26).subtract(1, 'months');
    const endDate = startDate.clone().add(1, 'month').subtract(1, 'seconds');

    var calStartDate = startDate.clone();
    while( calStartDate.day() != 0 ){
      calStartDate.subtract(1,'days');
    }
    var calEndDate = endDate.clone();
    while( calEndDate.day() != 6 ){
      calEndDate.add(1,'days');
    }

    var calDateList = [];
    var dayDiff = calEndDate.diff(calStartDate, 'days');
    const numberOfWeeks = dayDiff / 7;

    var weekLoop = 0;
    var dayLoop = 0;
    for(weekLoop = 0; weekLoop < numberOfWeeks; weekLoop++){
      var weekArray = [];
      const dateAtWeek = weekLoop * 7;

      for (dayLoop = 0; dayLoop < 7; dayLoop ++){
        const dayMoment = calStartDate.clone().add((dateAtWeek + dayLoop), 'days');
        //TODO: Check Holiday
        weekArray.push({
          dayMoment,
          isToday: dayMoment.isSame(today, 'day'),
        });
      }

      calDateList.push(weekArray);
    }

    dispatch({
      startDate,
      endDate,
      calDateList,
      type: CHANGE_CALENDAR_MONTH,
    })
  }
}

export const actions = {
  changeCalendarMonth
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  today: null,
  month: null,
  startDate: null,
  endDate: null,
  calDateList : [],
  calStartDate: null,
  calEndDate: null,
}


export default function MPMCalendarReducer(state = initialState, action) {
  switch (action.type) {
    case INITIAL_CALENDAR:
      return {
        ...state,
        today: action.today,
        month: action.month,
      }
    case CHANGE_CALENDAR_MONTH:
      return {
        ...state,
        startDate: action.startDate,
        endDate: action.endDate,
        calDateList: action.calDateList,
      }
    default:
  }

  return state
}
