// @flow
import { combineReducers } from 'redux';

import CalendarReducer from './calendar';
import type { CalendarState } from './calendar';

import TimesheetReducer from './timesheet';
import type { TimesheetState } from './timesheet';

export type AppState = {
  calendar: CalendarState,
  timesheet: TimesheetState
};

const makeRootReducer = () => {
  return combineReducers({
    calendar: CalendarReducer,
    timesheet: TimesheetReducer
  });
};

export default makeRootReducer;
