import Moment from 'moment'

// ------------------------------------
// Constants
// ------------------------------------
export const CHANGE_CALENDAR_MONTH = 'CHANGE_CALENDAR_MONTH'

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

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
// export const initialCalendar = () => {
//   return (dispatch, getState) => {
//     // const today = Moment();
//     // const month = getDefaultMonth();
//     // dispatch({
//     //   today,
//     //   month,
//     //   type: INITIAL_CALENDAR,
//     // })
//     //
//     // changeCalendarMonth(month)(dispatch, getState);
//   }
// }

export const nextMonth = () => {
  return (dispatch, getState) => {
    const month = getState().calendar.month.add(1, 'months');
    changeCalendarMonth(month)(dispatch, getState);
  }
}

export const prevMonth = () => {
  return (dispatch, getState) => {
    const month = getState().calendar.month.subtract(1, 'months');
    changeCalendarMonth(month)(dispatch, getState);
  }
}

export const currentMonth = () => {
  return (dispatch, getState) => {
    changeCalendarMonth(getDefaultMonth())(dispatch, getState);
  }
}

const calMonthArray = (month) => {
  const startDate = month.clone().date(26).subtract(1, 'months');
  const endDate = startDate.clone().add(1, 'month').subtract(1, 'seconds');
  const today = Moment();
  var calStartDate = startDate.clone();
  while( calStartDate.day() != 0 ){
    calStartDate.subtract(1,'days');
  }
  var calEndDate = endDate.clone();
  while( calEndDate.day() != 6 ){
    calEndDate.add(1,'days');
  }

  var calDateList = [];
  var dayDiff = calEndDate.diff(calStartDate, 'days') + 1;
  const numberOfWeeks = dayDiff / 7;

  var weekLoop = 0;
  var dayLoop = 0;
  for(weekLoop = 0; weekLoop < numberOfWeeks; weekLoop++){
    var weekArray = [];
    const dateAtWeek = weekLoop * 7;

    for (dayLoop = 0; dayLoop < 7; dayLoop ++){
      const dayMoment = calStartDate.clone().add((dateAtWeek + dayLoop), 'days');
      const dayMomentDate = dayMoment.date()
      const isOtherMonth = (weekLoop == 0 && dayMomentDate < 26 && dayMomentDate > 10) || (((weekLoop + 1) == numberOfWeeks ) && (dayMomentDate > 25 || dayMomentDate < 10))
      //TODO: Check Holiday
      weekArray.push({
        dayMoment,
        isOtherMonth,
        key: dayMoment.format('DD-MM-YYYY'),
        isToday: dayMoment.isSame(today, 'day'),
      });
    }

    calDateList.push(weekArray);
  }

  return calDateList;
}

export const changeCalendarMonth = (month) => {
  return (dispatch, getState) => {
    const currentState = getState().calendar;

    dispatch({
      month,
      calDateList: calMonthArray(month),
      type: CHANGE_CALENDAR_MONTH,
    })
  }
}

export const actions = {
  changeCalendarMonth,
  nextMonth,
  prevMonth,
  currentMonth,
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  today: Moment(),
  month: getDefaultMonth(),
  calDateList : calMonthArray(getDefaultMonth()),
}


export default function calendarReducer(state = initialState, action) {
  switch (action.type) {

    case CHANGE_CALENDAR_MONTH:
      return {
        ...state,
        month: action.month,
        calDateList: action.calDateList,
      }

    default:
  }

  return state
}
